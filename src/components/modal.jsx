import styles from "./modal.module.css";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "motion/react";

// Проверка на валидный CSS цвет
function isValidCssColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
}

export default function Modal({
  isOpen,
  onClose,
  inputData,
  bgColor,
  fgColor,
}) {
  const inputBgColor =
    !bgColor || !isValidCssColor(bgColor) ? "#ffffff" : bgColor;

  const inputFgColor =
    !fgColor || !isValidCssColor(fgColor) ? "#000000" : fgColor;

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code svg");
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${inputData}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={styles.modalOverlay} onClick={onClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div id="qr-code" className={styles.boxQr} style={{ backgroundColor: inputBgColor }} >
              <QRCode value={inputData || "Empty QR"} size={270} bgColor={inputBgColor} fgColor={inputFgColor}/>
            </div>

            <div className={styles.boxTextQr}>
              <p className={styles.text2}>QR code Text:</p>
              <p className={styles.text}>{inputData}</p>
            </div>
            <div className={styles.boxTextQr}>
              <p className={styles.text2}>Background color:</p>
              <p className={styles.text}>{inputBgColor}</p>
            </div>
            <div className={styles.boxTextQr}>
              <p className={styles.text2}>Foreground color:</p>
              <p className={styles.text}>{inputFgColor}</p>
            </div>

            <button className={styles.downloadQr} onClick={handleDownload}>
              <p>Download QR Code</p>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
