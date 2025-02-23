// Function to save notes to local storage
function saveToWebsite() {
  const notesContent = document.getElementById("editor").innerText;
  localStorage.setItem("savedNotes", notesContent);
  alert("Notes saved to website!");
}

// Function to save notes to a file
function saveToFile() {
  const notesContent = document.getElementById("editor").innerText;
  const blob = new Blob([notesContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "notes.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Function to handle highlighting text (if you want any specific action on highlight)
function highlightText() {
  console.log("Text highlighted");
}

// Function to toggle the PDF viewer display
function toggleEditor() {
  const pdfViewer = document.getElementById("pdfViewerSection");
  const toggleBtn = document.getElementById("toggleBtn");

  if (pdfViewer.style.display === "none") {
    pdfViewer.style.display = "block";
    toggleBtn.innerText = "Hide PDF Viewer";
  } else {
    pdfViewer.style.display = "none";
    toggleBtn.innerText = "Show PDF Viewer";
  }
}

// Function to trigger the PDF upload file input
function triggerPdfUpload() {
  document.getElementById("pdfUpload").click();
}

// Function to handle PDF file selection and display in iframe
function handlePdfSelection(event) {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    const fileURL = URL.createObjectURL(file);
    const pdfWindow = document.getElementById("pdfWindow");
    pdfWindow.src = fileURL;
    pdfWindow.style.display = "block";
  } else {
    alert("Please select a valid PDF file.");
  }
}

// Load saved notes from local storage when the page loads
window.addEventListener("load", () => {
  const savedNotes = localStorage.getItem("savedNotes");
  if (savedNotes) {
    document.getElementById("editor").innerText = savedNotes;
  }
});

function unhidePdfViewer() {
  const pdfViewer = document.getElementById("pdfViewerSection");
  pdfViewer.style.display = "block"; // Make the PDF Viewer visible
  const pdfWindow = document.getElementById("pdfWindow");
  
  // Optionally make the iframe (PDF content) visible, if necessary
  if (pdfWindow.src) {
    pdfWindow.style.display = "block";
  }
}

function unhidePdfViewer() {
  const pdfViewer = document.getElementById("pdfViewerSection");
  pdfViewer.style.display = "block";
  document.querySelector('button[onclick="unhidePdfViewer()"]').style.display = "none"; // Hide unhide button
}

function toggleEditor() {
  const pdfViewer = document.getElementById("pdfViewerSection");
  const toggleBtn = document.getElementById("toggleBtn");

  if (pdfViewer.style.display === "none") {
    pdfViewer.style.display = "block";
    toggleBtn.innerText = "Hide PDF Viewer";
    document.querySelector('button[onclick="unhidePdfViewer()"]').style.display = "none"; // Hide unhide button
  } else {
    pdfViewer.style.display = "none";
    toggleBtn.innerText = "Show PDF Viewer";
    document.querySelector('button[onclick="unhidePdfViewer()"]').style.display = "block"; // Show unhide button
  }
}
