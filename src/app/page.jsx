"use client";
import Image from "next/image";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [fgColor, setFgColor] = useState("");
  const [modal, setModal] = useState(false);

  const onClose = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const disabledButton = inputData.length === 0;
  return (
    <>
      <div className={styles.homeContent}>
        <div className={styles.boxTexts}>
          <h1>Create your QR code in seconds</h1>
          <h3>Enter a link, text, or phone number and get a QR code</h3>
        </div>
        <div className={styles.boxAllContent}>
          <div className={styles.boxInput}>
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Text, link or phone number"
            />
          </div>
          <div className={styles.boxCustomInputs}>
            <p>Customization</p>
            <div className={styles.boxInput}>
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="Background color (default white)"
              />
            </div>
            <div className={styles.boxInput}>
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                placeholder="Foregtound color (default black)"
              />
            </div>
          </div>
          <button
            onClick={() => setModal(true)}
            disabled={disabledButton}
            className={styles.generate}>
            <p>Generate</p>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modal}
        onClose={onClose}
        inputData={inputData}
        bgColor={bgColor}
        fgColor={fgColor}
      ></Modal>
    </>
  );
}
