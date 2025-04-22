import QrScanner from "../../Components/QrScanner";

const ScannerPage = ({ setScannedData }) => {
  const handleScan = (scannedData) => {
    try {
        const parsedData = JSON.parse(scannedData);
        setScannedData(parsedData); // Pass data to parent
    } catch (err) {
      console.error("❌ Invalid QR Code Format", {
        rawData: scannedData,
        error: err,
      });
    }
  };

  return (
    <div className="h-[65vh]">
      <QrScanner onScanSuccess={handleScan} />
    </div>
  );
};

export default ScannerPage;
