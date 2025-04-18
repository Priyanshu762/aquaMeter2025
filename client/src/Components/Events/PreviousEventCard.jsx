import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import the check icon
import { useSelector } from "react-redux";

const PreviousEventCard = ({ event }) => {
  const user = useSelector((state) => state.auth.user);

  const handleDownloadCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [700, 500] // Adjusted size for a more typical certificate size
    });

    // Certificate Background Styling: Solid Color (Light Blue)
    doc.setFillColor(200, 240, 255); // Light Blue color
    doc.rect(0, 0, 700, 500, "F"); // Apply background color

    // Adding a Solid Border (Blue)
    doc.setDrawColor(74, 144, 226); // Blue Border Color
    doc.setLineWidth(5);
    doc.rect(10, 10, 680, 480); // Solid border with padding

    // Title: Certificate of Participation (Make it bold and large)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(30);
    doc.text("Certificate of Participation", 350, 80, { align: "center" });

    // Subtitle: This is to certify that
    doc.setFontSize(18);
    doc.setFont("Helvetica", "normal");
    doc.text("This is to certify that", 350, 140, { align: "center" });

    // User Name (Large font, emphasizing the participant)
    doc.setFontSize(24);
    doc.setFont("Helvetica", "bold");
    doc.text(`${user.name} (${user.email})`, 350, 180, { align: "center" });

    // Attended the Event
    doc.setFontSize(18);
    doc.setFont("Helvetica", "normal");
    doc.text("has successfully attended the event", 350, 220, { align: "center" });

    // Event Title (It should be prominent)
    doc.setFontSize(22);
    doc.setFont("Helvetica", "bold");
    doc.text(`"${event.title}"`, 350, 260, { align: "center" });

    // Event Date and Location
    doc.setFontSize(14);
    doc.setFont("Helvetica", "normal");
    doc.text(
      `held on ${event.date} at ${event.location}`,
      350,
      300,
      { align: "center" }
    );

    // Issued by: Footer Text
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text("Issued by: AWS Cloud Club, University of Lucknow", 350, 460, { align: "center" });

    // Optional: Add a signature section (just a line for illustration)
    doc.setLineWidth(0.5);
    doc.line(500, 430, 650, 430); // Draw signature line

    doc.setFontSize(12);
    doc.text("Authorized Signature", 575, 445, { align: "center" });

    // Save the certificate as PDF
    doc.save(`Certificate_${user.name}_${event.date}.pdf`);
  };




  return (
    <>
    <div className="relative flex flex-col bg-gray-100 dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl p-5 w-full md:w-80 transition-all hover:shadow-xl ">
      {/* Improved Badge - Positioned in the image */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full z-20 shadow-md backdrop-blur-md">
        <AiOutlineCheckCircle className="text-lg" /> <span>Attended</span>
      </div>

      {/* Event Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 ">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover  "
          />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">{event.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{event.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">{event.date}</span>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium px-3 py-1 rounded-full">{event.time}</span>
        <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-medium px-3 py-1 rounded-full">{event.location}</span>
      </div>

      <button 
        className="w-full mt-3 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-all shadow-md cursor-pointer"
        type="button"
        onClick={handleDownloadCertificate}
      >
        🎓 Download Certificate
      </button>
    </div>
        <div
      id="certificate-template"
      style={{
        width: "1000px",
        height: "700px",
        padding: "40px",
        fontFamily: "serif",
        backgroundColor: "#fdfdfd",
        border: "10px solid #4a5568",
        position: "absolute",
        top: "-2000px", // Hide it off-screen
        left: "-2000px"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Certificate of Participation</h1>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>This is to certify that</p>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{event.userName} ({event.userId})</h2>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>has successfully attended</p>
        <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>"{event.title}"</h3>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>on {event.date} at {event.location}</p>
        <p style={{ fontSize: "14px", marginTop: "30px" }}>Issued by: AWS Cloud Club, University of Lucknow</p>
      </div>
    </div>
          </>
  );
};

export default PreviousEventCard;
