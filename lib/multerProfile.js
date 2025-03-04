import multer from 'koa-multer';
import path from 'path'; 

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photos/'); // Directory where photos will be saved
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    cb(null, fileName); // Custom filename with timestamp
  }
});

// Configure storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdfs/'); // Directory where PDFs will be saved
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    cb(null, fileName); // Custom filename with timestamp
  }
});

// File filter to only accept images for photo uploads
const photoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Invalid file type. Only images are allowed for photos.'), false); // Reject non-image files
  }
};

// File filter to only accept PDFs for PDF uploads
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept PDF files
  } else {
    cb(new Error('Invalid file type. Only PDFs are allowed.'), false); // Reject non-PDF files
  }
};

// Initialize multer for photo upload
const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: photoFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit photo file size to 5MB
});

// Initialize multer for PDF upload
const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit PDF file size to 10MB
});


export { uploadPdf, uploadPhoto }