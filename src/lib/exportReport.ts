import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = async () => {
  const element = document.getElementById("dashboard-content");
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("ecocloud-analyser-report.pdf");
  } catch (error) {
    console.error("Failed to export PDF", error);
  }
};
