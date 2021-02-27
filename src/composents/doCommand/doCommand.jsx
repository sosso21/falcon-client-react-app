import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Error from "../error/error.jsx";
import queryString from "query-string";
import dataWebSite from "../../data.json"

const DoCommand = ({ show, setShow, cart }) => {
  const [promo, setPromo] = useState(
    queryString.parse(window.location.search).promo
      ? queryString.parse(window.location.search).promo
      : ""
  );
  const [express, setExpress] = useState(false);
  const deliveriesPrice = {currency : dataWebSite.currency, normal: dataWebSite.Deliveries_price.normal, express: dataWebSite.Deliveries_price.prenieum , normalDelay: dataWebSite.Deliveries_price.normalDelay,expressDelay: dataWebSite.Deliveries_price.preniemDelay}; 

  const [err, setErr] = useState("");
const [disbaleBbtn , setDisbaleBbtn ] =useState(false);

  const pay = (e) => {
    e.preventDefault();
    setDisbaleBbtn(true)

    fetch(dataWebSite.urlServer+"/api/payment",{
      method: 'POST',
      headers: {
       'Accept': 'application/json, text/plain, */*',
       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        promo: promo,
        express: express,
        cart: JSON.stringify(cart),
        token: JSON.parse(localStorage.token)
      }).toString(),
    })
     .then((res) => res.json())
      .then(
        (result) => {
          if(result.error){
             setErr(result.error)
          }
          else if (result.link){
            return window.location.replace(result.link);
          }
          return setDisbaleBbtn(false)


        },
        (err) => {
          console.log("Une erreur c' est produit:", err);
        }
      );
  };

  if(queryString.parse(window.location.search).set == "clearCart"){
    localStorage.setItem("cart","")
    return window.location.href="/"

  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="font-weight-light w-100 mx-4">Commander</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="p-4">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control w-100"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="ceode promotionel"
                />
              </div>

              <div className="form-check my-3">
                <input
                  onClick={() => setExpress(false)}
                  checked={!express}
                  className="form-check-input"
                  name="deliveries"
                  type="radio"
                  id="normal"
                  value="normal"
                />
                <label className="form-check-label" htmlFor="normal">
                  Livraison Norml {deliveriesPrice.normal == 0
                    ? "Gratuite"
                    : deliveriesPrice.normal +  deliveriesPrice.currency} (reception {deliveriesPrice.normalDelay}) 
                </label>
              </div>
              <div className="form-check my-3">
                <input
                  onClick={() => setExpress(true)}
                  checked={express}
                  className="form-check-input"
                  name="deliveries"
                  type="radio"
                  id="express"
                  value="option1"
                />
                <label className="form-check-label" htmlFor="express">
                  Livraison Ecpress {deliveriesPrice.express == 0
                    ? "Gratuite"
                    : deliveriesPrice.express + deliveriesPrice.currency } (reception {deliveriesPrice.preniemDelay}) 
                </label>
              </div>
            </form>

            <div className="d-block">
           {
             err && <Error response={{error : err}} />
           } 
           
           <div className="input-group w-100">
             <button onClick={(e) => pay(e)} className= "btn btn-lg btn-primary mx-auto" disabled={disbaleBbtn}
              >
                Suivant
              </button>
            </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DoCommand;
