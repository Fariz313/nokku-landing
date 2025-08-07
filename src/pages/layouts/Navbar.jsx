import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { PiPlugsConnectedFill } from "react-icons/pi";
export default function Navbar() {
    return <div className='absolute top-0 left-0 w-full z-10 p-5'>
        <div className="ws-full ">
            <div className="flex w-200px px-5  justify-between">
                <span className="font-[600] text-white text-2xl flex items-center gap-2">
                   <PiPlugsConnectedFill></PiPlugsConnectedFill> NOKKU 
                   <span className='text-yellow-300'>
                    TECH
                   </span>
                </span>
                <div className='flex gap-6'>
                    <Link>Home</Link>
                    <Link>Contact</Link>
                    <Link>Projects</Link>
                    <Link>Client</Link>
                    <Link>About Us</Link>
                </div>
            </div>
        </div>
    </div >
}