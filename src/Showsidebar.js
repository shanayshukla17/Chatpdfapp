import './Showsidebar.css'
import Zoom from 'react-reveal/Zoom';
import React, { useState } from 'react';


function Showsidebar({chatHistory,toggle,setToggle}){
    return(
        <div className='Sidebar'>
            <div className='sidebar_head'>Prompts 
                <button onClick={()=>setToggle(!toggle)}>
                <img src="/menu_icon.png" alt='Here'></img>
                </button>
            </div>
            
            <div className="chat-show-side">
                    {chatHistory.map((entry, index) => (
                        <Zoom key={index}>
                            <div className={`chat-messages ${entry.role}`}>
                                {entry.parts.map((part, partIndex) => (
                                    <span key={partIndex}>{part.text}</span>
                                ))}
                            </div>
                        </Zoom>
                    ))}
                </div>
       </div> 
    )
}

export default Showsidebar