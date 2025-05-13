class ReportsJob
  include Sidekiq::Job

  def perform(user_id, post_slug)
    ActionCable.server.broadcast(user_id, { message: I18n.t('report.render'), progress: 25 })

    post = Post.find_by!(slug: post_slug)

    pdf_content = ApplicationController.render(
      assigns: { post: },
      template: 'posts/report/download',
      layout: 'pdf'
    )

    ActionCable.server.broadcast(user_id, { message: 'pdf generated', progress: 50 })

    pdf_report = WickedPdf.new.pdf_from_string(pdf_content)

    ActionCable.server.broadcast(user_id, { message: 'pdf uploaded', progress: 75 })

    post.report.purge_later if post.report.attached?

    post.report.attach(
      io: StringIO.new(pdf_report), filename: "blog-it-#{post_slug}.pdf",
      content_type: 'application/pdf'
    )

    post.save!

    ActionCable.server.broadcast(user_id, { message: I18n.t('report.attach'), progress: 100 })
  end
end
