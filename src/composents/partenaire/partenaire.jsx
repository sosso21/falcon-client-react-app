import React, { useState } from "react";
import Fde from "react-reveal/Fade";
import Money from "./components/Money.jsx";
import Head from "./components/head.jsx";
import Header from "../header/header";
import Footer from "../footer/footer";
 

import "./components/partener.css";

const Partenaire = () => {
  const isAffiliate = JSON.parse(sessionStorage.getItem("userInfo")).promo.value
   
    console.log('isAffiliate:', isAffiliate)

  return (
    <main className="bg-body flex-verticaly">
      <Header />
      <Head state={isAffiliate} />
       
      {(isAffiliate== 1) && <Money/>}
      <Footer/>
     </main>
  );
};

export default Partenaire;
