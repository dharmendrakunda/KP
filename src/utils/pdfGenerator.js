import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture full report card element (including header, logo, student info, tables, chart, and signatures)
 * and export as high-resolution PDF document.
 */
export const downloadReportCardPDF = async (elementId, studentName, termName = 'Annual') => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Report card element not found for PDF export.");
    return;
  }

  try {
    // Scroll element to top before capture
    element.scrollTop = 0;

    // Render HTML element to high-res canvas with full CORS & image support
    const canvas = await html2canvas(element, {
      scale: 3, // Very high resolution print quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Fit canvas onto A4 PDF page
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
    const safeName = (studentName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const safeTerm = (termName || 'Report').replace(/[^a-zA-Z0-9]/g, '_');
    pdf.save(`KPPS_ReportCard_${safeName}_${safeTerm}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Opening browser print dialog to save as PDF...");
    window.print();
  }
};
