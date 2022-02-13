import React from 'react'
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BiImages } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import DescriptionIcon from '@mui/icons-material/Description';
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import LogoutIcon from '@mui/icons-material/Logout';
import { Dashboard, Logout} from '@mui/icons-material';
import { GoSignOut } from "react-icons/go";

import Navbar from './navbar';
function sidebar() {
    return (
        <div  style ={{position:'fixed',width:'243px',height:'100vh',background:'#d1d5db',top:'0px'}}>
         
        <div
          
        >
          <div   className="flex-col items-stretch min-h-full flex-nowrap relative flex justify-between">
            <div >
              <div
                className="flex flex-row relative justify-center items-center "
                style={{ margin: "12px 10px"}} >
  
                <a
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="text-center w-full inline-block mt-[54px]"
                >
                  <h1
                    className="text-gray-600 mb-3 "
                    style={{ marginRight: "60px",fontFamily:"Passion One",fontWeight:'500',fontSize:'28px',lineHeight:'14.35px',color:'#6169F6' }}
                  >
                    RecruitFlo
                  </h1>
                </a>
                <div
                  style={{ transform: "rotate(-90deg)", marginLeft: "40px" }}
                  className="absolute right-0 "
                >
                </div>
              </div>
  
              
              <div className="flex flex-col px-4 mt-[30px] ">
                <ul className="flex-col min-w-full flex list-none" style ={{fontFamily:"Epilogue" }}>
                  <li className="rounded-lg mb-2">
                    <NavLink
                      to="/dashboard"
                      exact
                      className={({isActive})=>isActive ? "flex items-center gap-4 bg-[#6169F6] text-white shadow-md font-light px-4 py-3 rounded-lg" : "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"}
                    >
                      <Dashboard/>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="rounded-lg mb-2">
                    <NavLink
                      to="/description"
                     
                      className={({isActive})=>isActive ? "flex items-center gap-4 bg-[#6169F6] text-white shadow-md font-light px-4 py-3 rounded-lg" : "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"}

                    >
                      {/* <Icon name="toc" size="2xl" /> */}
                     <DescriptionIcon/>
                      Description
                    </NavLink>
                  </li>
                  <li className="rounded-lg mb-2">
                    <NavLink
                      to="/"
                     
                      className={({isActive})=>isActive ? "flex items-center gap-4 bg-[#6169F6] text-white shadow-md font-light px-4 py-3 rounded-lg" : "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"}

                    >
                    <GoSignOut size={24} className=" mt-1" />

                     Log out
                    </NavLink>
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default sidebar
