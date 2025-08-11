import React, { useState } from "react";
import { subjects } from "../../data"; // adjust path

const DAA = () => {
  const daaSubject = subjects.find(sub => sub.name === "DAA");
  const [openUnit, setOpenUnit] = useState(null);
  const [modalPdf, setModalPdf] = useState(null);

  const toggleUnit = (index) => {
    setOpenUnit(openUnit === index ? null : index);
  };

  const openPdfModal = (pdfUrl) => {
    setModalPdf(pdfUrl);
  };

  const closePdfModal = () => {
    setModalPdf(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Design and Analysis of Algorithms (DAA)</h1>

      {daaSubject.chapters.map((chapter, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          {/* Dropdown Button */}
          <button
            onClick={() => toggleUnit(index)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {chapter.title} {openUnit === index ? "▲" : "▼"}
          </button>

          {/* Files List */}
          {openUnit === index && (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: "#f9f9f9"
              }}
            >
              {chapter.files.map((pdf, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 0",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  <span>{pdf.name}</span>
                  <div>
                    {/* Open Modal */}
                    <button
                      onClick={() => openPdfModal(pdf.file)}
                      style={{ marginRight: "10px" }}
                    >
                      📂
                    </button>
                    {/* Download */}
                    <a href={pdf.file} download>
                      ⬇️
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* PDF Modal */}
      {modalPdf && (
        <div
          onClick={closePdfModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {/* PDF Viewer */}
            <iframe
              src={modalPdf}
              width="1200px"
              height= "1100px"
              title="PDF Viewer"
            ></iframe>

            {/* Download Button */}
            <a href={modalPdf} download>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Download PDF
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DAA;
