import React from 'react';
import component from "./component.json"
import dataWebSite from "../../data.json"
import './footer.css';

const Footer = () => {
    
    return (
        <footer className="mt-5 bg-dark text-light d-flex justify-content-around flex-column">

        <div className="d-flex justify-content- text-center text-wrap ">
{
    component.map(i=>
    
        <span className="d-flex flex-column justify-content-around mx-3 "><i className={"fs-4rem bi "  + i.svg }></i><strong  >{i.title}</strong><p> {i.content} </p></span>
    )
} 

         </div>


        <div className="d-flex justify-content-around">

           <p>{new Date().getFullYear()}  All right is reserved</p>
           {dataWebSite.social.map(i=>
           <a  className={i.svg+" bi text-light font-big"} title={i.className} href={i.url} target="_blanck"> </a> 
           )
           }
           </div>


        </footer>
    );
};


export default Footer