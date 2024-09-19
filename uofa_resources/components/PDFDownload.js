'use client';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, getMetadata, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const PDFDownload = ({ pdfPath }) => {
  console.log('pdfPath:', pdfPath);
  const [pdfName, setPdfName] = useState('jjj');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const fetchPDFMetadata = async () => {
      try {
        const pdfRef = ref(storage, pdfPath);
        const metadata = await getMetadata(pdfRef);
        setPdfName(metadata.name);

        const url = await getDownloadURL(pdfRef);
        setDownloadUrl(url);
      } catch (error) {
        console.error('Error fetching PDF metadata:', error);
      }
    };

    console.log('before');
    fetchPDFMetadata();
    console.log('after');
  }, [pdfPath]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div>
      {pdfName && (
        <button onClick={handleDownload} className="text-blue-600 underline">
          {pdfName}
        </button>
      )}
    </div>
  );
};

export default PDFDownload;