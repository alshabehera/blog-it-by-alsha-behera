import React, { useEffect, useState } from "react";
import { Modal, Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "../commons/ProgressBar";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

const Pdf = ({ setIsModalOpen, description }) => {
  const [downloadStatus, setDownloadStatus] = useState("");
  const [completion, setCompletion] = useState(0);

  const { slug } = useParams();
  const consumer = createConsumer();

  const closeHandler = () => {
    setIsModalOpen(false);
    consumer.disconnect();
  };

  const pdfGeneration = async () => {
    try {
      console.log("Triggering PDF generation...");
      await postsApi.generatePdf(slug);
    } catch (err) {
      Logger.error("PDF generation failed:", err);
    }
  };

  const retrievePdf = async () => {
    try {
      const { data, headers } = await postsApi.download(slug);

      const header = headers["content-disposition"];
      let filename = "blog-it-post.pdf";

      const nameMatch = header?.match(/filename="?([^"]+)"?/);
      if (nameMatch?.[1]) filename = nameMatch[1];

      FileSaver.saveAs(data, filename);
    } catch (err) {
      Logger.error("PDF download error:", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage: setDownloadStatus,
      setProgress: setCompletion,
      generatePdf: pdfGeneration,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (completion === 100) {
      setDownloadStatus("Finalizing PDF...");
      retrievePdf();
    }
  }, [completion]);

  return (
    <Modal isOpen onClose={closeHandler}>
      <Modal.Header
        title="Preparing Your File"
        description={description}
      />
      <Modal.Body className="flex flex-col items-center gap-4">
        <Typography style="h4">{downloadStatus}</Typography>
        <ProgressBar progress={completion} />
      </Modal.Body>
    </Modal>
  );
};

export default Pdf;
