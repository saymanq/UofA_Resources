'use client';
import { useState, useEffect } from 'react'
import NavBar from '../components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login/page';
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
      {loading ? null : !user ? (<div className='w-full flex justify-center items-start'><div className="bg-emerald-600 text-white sm:w-[500px] w-[330px] h-[300px] flex justify-center items-center mt-[150px] flex-col rounded-2xl sm:text-[20px] text-[15px]">Please login to access resources</div> </div>) : (<div><PDFDownload /></div>)}
    </div>
  )
    }
