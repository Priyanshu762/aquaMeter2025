// src/components/QrScanner.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 25,
      qrbox: { width: 350, height: 300 },
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

  const mystyle = {
      width: '100%',
      height: '250px'
    };

  return (
    <div>
      <div id="qr-reader" style={mystyle} />
    </div>
  );
};

export default QrScanner;
