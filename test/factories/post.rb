FactoryBot.define do
  factory :post do
    association :user
    association :organization
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph(sentence_count: 4) }
    upvotes { 0 }
    downvotes { 0 }
    is_bloggable { Faker::Boolean.boolean }
    status { 0 }
    slug { Faker::Internet.slug }
    last_published_date { status == :Publish ? Time.current : nil }

    trait :published do
      status { :Publish }
      last_published_date { Time.current }
    end

    after(:build) do |post|
      post.categories << build(:category) if post.categories.empty?
    end
  end
end
