'use client';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
        toast.error('Error fetching PDFs. Please try again later.');
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
    link.target = '_blank';
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
      <Toaster position="top-center" reverseOrder={false}/>
      <div className='bg-emerald-500 sm:w-[500px] w-[400px] flex items-center flex-col justify-center py-3'>
        <h2 className="sm:text-2xl text-lg font-bold mb-4">STAT252 Fall 2024 Annotated Notes</h2>
        <div className='flex flex-row justify-between sm:w-[450px] w-[360px] mb-2 sm:text-sm text-xs'>
          <div>Instructor: Mike Kowalski</div>
          <div>Lec B1 (52107)</div>
          <div>13:00 - 13:50 MWF</div>
        </div>
        {pdfs.length === 0 ? (
          <p>Loading PDFs...</p>
        ) : (
          <ul className="">
            {pdfs.map((pdf, index) => (
              <li key={index} className="mb-2 border-2 border-emerald-400 p-3 sm:w-[450px] w-[360px] sm:text-base hover:bg-emerald-300 ">
                <div className='flex flex-row items-center justify-between'>
                  <button
                    onClick={() => handleDownload(pdf.url, pdf.name)}
                    className="text-blue-700 hover:underline"
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
      <div className='bg-emerald-500 sm:w-[500px] w-[400px] flex items-center flex-col justify-center p-3 mt-3 text-xs text-center sm:gap-1 gap-2'>
        <div>Checkout my personal website <a href="https://sayman.me" target="_blank" className='text-blue-700 hover:underline'>here</a></div>
        <div>Code for this website can be found at <a href="https://github.com/saymanq/UofA_Resources" target="_blank" className='text-blue-700 hover:underline'>https://github.com/saymanq/UofA_Resources</a></div>
        <div>If you have feedback or suggestions please email me at <a href="mailto:syedaym1@ualberta.ca" target="_blank" className='text-blue-700 hover:underline'>syedaym1@ualberta.ca</a></div>
      </div>
    </div>
  );
};

export default PDFDownloadList;