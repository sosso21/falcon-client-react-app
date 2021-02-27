import React, { useEffect, useRef } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import conditions from "./files/condition.json"
import Mentions from "./files/mention.jsx"
import request from "./files/request.json"


const Legal = () =>
{
  
  const faaq = useRef()
  const mention = useRef()
  const condition = useRef()


  useEffect(() => {
    const  path = (window.location.pathname).split("/")[2];
    if(path){
      if(path == "faq"){
        faaq.current.scrollIntoView({ behavior:'smooth'})
      }
      else if(path == "mention"){
        mention.current.scrollIntoView({ behavior:'smooth'})
      }
      else if(path == "conditions"){
        condition.current.scrollIntoView({ behavior:'smooth'})
      }
    }

  }, [window.location])


  return (
    <main className="bg-body flex-verticaly">
      <Header />
      <div className="container">

        <section className="my-4">
          <h2 ref={faaq} className="font-weight-light">FAQ:</h2>
          <ul>
            {
              request.map(i => <li className="my-1">
                <h3>{i.req}</h3>
                <article>{i.res} </article>
              </li>)
            }
          </ul>
        </section>
        <section className="my-4">
          <h2 ref={mention} className="font-weight-light">Mentions légals:</h2>
          <Mentions />
        </section>

        <section className="my-4">
          <h2 ref={condition} className="font-weight-light">Conditions générales de vente concernent et d'utilisation;</h2>

          <article>
            <ul>
              {conditions.li.map(i => <li>{i}</li>)}
            </ul>
          </article>

        </section>

      </div>

      <Footer />
    </main>
  );
};

export default Legal;

/// chronotij 
/// email :@gmail.com
//
