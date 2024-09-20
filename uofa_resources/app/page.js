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
    <div>
      <NavBar />
      {loading ? null : !user ? (<div>Login In First</div>) : (<div><PDFDownload /></div>)}
    </div>
  )
    }
