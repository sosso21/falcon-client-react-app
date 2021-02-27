import React, { useRef  } from "react";
import FormPeomo from "./form.jsx";

import Fade from 'react-reveal/Fade';

const Head = ({state = -1}) => {
  
  const formRef = useRef()

  return (
    <>
      <section className="head-section">
      <Fade bottom> 
        <h2 className="title-big">
          {state == 1 ? "VOUS ÊTES" : "DEVENEZ"} PARTENAIRE !
        </h2>

        <p className="mb-5 ">
          GAGNEZ des CADEAUX , du CACHE. Offrez è vos amis et votre audience des
          PROMOTIONS avec votre code promo.{" "}
        </p>
      </Fade>

        <button onClick={()=>formRef.current.scrollIntoView({ behavior: 'smooth' })} className="btn btn-dark rounded-circle btn-sm mt-5 bi bi-chevron-down">
          
        </button>
      </section>

      <section className="mx-auto vw-90 my-4 ">
        
        <h2 className="font-weight-light w-100 text-center">
        {state == 1 ? "UTILISEZ" : "DEMANDEZ"} VOTRE CODE PROMO
        </h2>
        <div  ref={formRef} className="flex-sm-justify "> 
        <img src="/img/draw.png" alt="dessin de personne en costume " />
        
      <FormPeomo/>
        </div>
 
      </section>
    </>
  );
};

export default Head;
