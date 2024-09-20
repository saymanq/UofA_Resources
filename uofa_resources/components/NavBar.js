'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';


const NavBar = () => {
    const { user, GoogleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    
    const handleSignIn = async () => {
        try {
        await GoogleSignIn();
        } catch (error) {
        console.log(error);
        }
    }

    const handleSignOut = async () => {
        try {
        await logOut();
        } catch (error) {
        console.log(error);
        }
    }
    
    useEffect(() => {
        const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
        setLoading(false);
        };
        checkAuthentication();
    }, [user])
    
    return (
        <section className=''>
          <div className="flex justify-between items-center p-3 h-14 bg-emerald-600 text-white rounded-2xl m-5">
            <ul>
              <li className='ml-10 font-mono sm:text-[25px]'><Link href='/'>UofAResources</Link></li>
            </ul>
            <ul>
            {loading ? null : !user ? (<div className="flex flex-row"><li className='mx-2 text-[15px]' onClick={handleSignIn}><Link href='/'>Login</Link></li>
              <li className='mx-2 text-[15px]' onClick={handleSignIn}><Link href='/'>Signup</Link></li></div>) : (<li className='mx-2 cursor-pointer' onClick={handleSignOut}><Link href='/'>Logout</Link></li>)}
            </ul>
          </div>
        </section>
      )
};

export default NavBar;
