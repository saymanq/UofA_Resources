'use client';
import { useState, useEffect } from 'react'
import NavBar from '../components';
import PDFDownload from '../components/PDFDownload';
import { UserAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = UserAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
    setLoading(false);
    };
    checkAuthentication();
  }, [user])

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 0,}}>
      <NavBar />
      {loading ? null : !user ? (
        <div className='flex justify-center flex-col items-center'>
          <div className="bg-emerald-500 text-white sm:w-[500px] w-[330px] h-[300px] flex justify-center items-center mt-[150px] flex-col rounded-2xl sm:text-[20px] text-[15px]">
            Please login to access resources
          </div>
          <div className='bg-emerald-500 sm:w-[500px] w-[400px] flex items-center flex-col justify-center p-3 mt-3 text-xs text-center sm:gap-1 gap-2'>
            <div>Checkout my personal website <a href="https://sayman.me" target="_blank" className='text-blue-700 hover:underline'>here</a></div>
            <div>Code for this website can be found at <a href="https://github.com/saymanq/UofA_Resources" target="_blank" className='text-blue-700 hover:underline'>https://github.com/saymanq/UofA_Resources</a></div>
            <div>If you have feedback or suggestions please email me at <a href="mailto:syedaym1@ualberta.ca" target="_blank" className='text-blue-700 hover:underline'>syedaym1@ualberta.ca</a></div>
          </div>
        </div>
        ) : (
        <div>
          <PDFDownload />
        </div>
        )}
    </div>
  )
    }