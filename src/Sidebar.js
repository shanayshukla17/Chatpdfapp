import './Sidebar.css';
import Showsidebar from './Showsidebar.js'
import Hidesidebar from './Hidesidebar.js'
import React, { useState } from 'react';

function Sidebar({chatHistory}){

    const [toggle,setToggle]=useState(false)

    return(
        <>
            {toggle ? (
                <Showsidebar chatHistory={chatHistory} toggle={toggle} setToggle={setToggle} />
            ) : (
                <Hidesidebar toggle={toggle} setToggle={setToggle} />
            )}
        </ >
    )
}

export default Sidebar;