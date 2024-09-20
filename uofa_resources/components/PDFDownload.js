'use client';
import React, { useState, useEffect } from 'react';
import { ref, listAll, getMetadata, getDownloadURL } from 'firebase/storage';
import { firestore } from '@/firebase'
import {collection, doc, getDocs, query, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { storage, db } from '../firebase';

const PDFDownloadList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState('');
  const [pdfsdata, setPdfsdata] = useState([]);


  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        console.log('Starting fetchPDFs');
        const folderRef = ref(storage, 'STAT252-Fall24-Annotated-Notes');
        const result = await listAll(folderRef);

        const pdfPromises = result.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const url = await getDownloadURL(itemRef);
          return {
            name: metadata.name,
            url: url
          };
        });

        const pdfList = await Promise.all(pdfPromises);
        setPdfs(pdfList);
        console.log('Finished fetchPDFs');
      } catch (error) {
        console.error('Error fetching PDFs:', error);
        setError('Error fetching PDFs. Please try again later.');
      }
    };

    const updatePdfs = async () => {
      const snapshot = query(collection(db, 'STAT252-Fall24-Annotated-Notes'));
      const docs = await getDocs(snapshot);
      const pdfList= [];
      docs.forEach((doc) => {
        pdfList.push({ name: doc.id, ...doc.data() })
      })
      console.log(pdfList);
      setPdfsdata(pdfList);
    }

    fetchPDFs();
    updatePdfs();
  }, []);

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="px-12 flex items-center flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">STAT252 Fall 2024 Annotated Notes</h2>
      {pdfs.length === 0 ? (
        <p>Loading PDFs...</p>
      ) : (
        <ul className="">
          {pdfs.map((pdf, index) => (
            <li key={index} className="mb-2 border-2 border-emerald-400 p-3 w-[450px]">
              <div className='flex flex-row items-center justify-between'>
                <button
                  onClick={() => handleDownload(pdf.url, pdf.name)}
                  className="text-blue-600 hover:underline"
                >
                    <div>{pdf.name}</div>
                </button>
              <div>{pdfsdata.find((pdfData) => pdfData.name === pdf.name).date}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PDFDownloadList;