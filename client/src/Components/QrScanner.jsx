// src/components/QrScanner.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 25,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear(); // stop scanner after success
      },
      (errorMessage) => {
        // optional: console.log('QR Error:', errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error("Clear failed", error));
    };
  }, []);

  return (
    <div>
      <h3>Scan QR Code</h3>
      <div id="qr-reader" style={{ width: "50%" }} />
    </div>
  );
};

export default QrScanner;
