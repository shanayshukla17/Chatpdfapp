import './Hidesidebar.css'
import React, { useState } from 'react';

function Hidesidebar({toggle,setToggle}){
    return (
    <>
    <div className='H-Sidebar'>
            <div className='H-sidebar_head'>
                <button onClick={()=>setToggle(!toggle)}>
                <img src="/menu_icon.png" alt='Here'></img>
                </button>
            </div>
       </div>
    </>
    )
}

export default Hidesidebar