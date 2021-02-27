import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Slide } from "react-slideshow-image";
import dataWebSite from "../../data.json"
import "./ModalProduit.css";
import "react-slideshow-image/dist/styles.css";
import "react-slideshow-image/dist/styles.css";

const ModalProduit = ({
  show,
  setShow,
  seeProduit,
  setCart,
  total,
  setTotal,
}) => {
  const [copyLink, setCopyLink] = useState(false);
  const [models, setModels] = useState('') ;
  useEffect(()=>{
    let options = [];
    seeProduit.models.map((i) => options.push(i[0]));
    setModels(options);
    
  },[show])
  const newModel = (e, array) => {
    let options = [];
    for (let i = 0; i < seeProduit.models.length; i++) {
      const element = seeProduit.models[i];
      if (array == element) {
        options.push(e);
      } else {
        options.push(models[i]);
      }
    }
    
    setModels(options);
  };

  const handelAddCart = (e) => {

    e.preventDefault();
    e.stopPropagation();
    
    const cart =JSON.parse(localStorage.getItem("cart"));
    
    const product = seeProduit;
    let model=""
    models.map(i=>model+=i+" ")
    product.model = model;
    
    let solde = 1;
    if (seeProduit.price[1]) {
      solde = (100 - seeProduit.price[1]) / 100;
    }
    setTotal(Math.round((total + seeProduit.price[0] * solde) * 100) / 100);
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];

      if (product._id === element._id && product.model === element.model ) {
        cart[i].count++;
        setCart(cart);
        return setShow(false);
      }
    }

    product.count = 1;
    setCart([...cart, product]);
    return setShow(false);
  };

  const copyToClipboard = () => {
    var textField = document.querySelector("#linkOfProduct");
    textField.select();
    document.execCommand("copy");
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, 10000);
  };

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };

  const linkOfProduct = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let link = window.location.host + "?produit=" + seeProduit._id;
    if (userInfo != undefined && userInfo.promo.value == 1) {
      return link + "&promo=" + userInfo.promo.code;
    }
    return link;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        className="modal-large"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="font-weight-light mx-4">{seeProduit.name} </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-flex">
            <div className="big-img">
              <Slide easing="ease" {...properties}>
                {seeProduit.image.map((i) => (
                  <div
                    className="parentSolde imgSpan"
                    style={{ backgroundImage: `url(${i})` }}
                  >
                    {seeProduit.price[1] && (
                      <strong className="font-big solde-content">
                        -{seeProduit.price[1]}%
                      </strong>
                    )}
                  </div>
                ))}
              </Slide>
            </div>
            <div className=" small-img">
              {seeProduit.image.map((i) => (
                <img src={i} alt={i} />
              ))}
            </div>

            <div className="big-box-description">
              <span>
                <span className="d-block">
                  <input
                    value={linkOfProduct()}
                    type="text"
                    className="form-control d-inline w-75"
                    id="linkOfProduct"
                  />
                  <btton
                    onClick={() => copyToClipboard()}
                    className="btn btn-outline-dark btn-sm"
                  >
                    {copyLink ? (
                      <i className="bi bi-check2-all"></i>
                    ) : (
                      <i className="bi bi-share-fill"></i>
                    )}
                  </btton>
                </span>
                {seeProduit.type.map((t) => (
                  <a
                    href={`/home?filter=${t.replace(" ", "_")}`}
                    className="m-2 btn-mg btn btn-outline-primary"
                  >
                    <i className="bi bi-tags-fill"></i>
                    {t}
                  </a>
                ))}
              </span>

              {seeProduit.models && (
                <span>
                  {seeProduit.models.map((i) => (
                    <select
                      value={models[i]}
                      onChange={(e) => newModel(e.target.value, i)}
                      className="custom-select form-control m-2"
                      aria-label=".form-select-lg example"
                    >
                      {i.map((ii) => (
                        <option value={ii}>{ii}</option>
                      ))}
                    </select>
                  ))}
                </span>
              )}

              <div className="text-right">
                {" "}
                {seeProduit.price[1] && (
                  <del className="text-danger mx-2">{seeProduit.price[0] + dataWebSite.currency} </del>
                )}{" "}
                <span className="font-big">
                  {seeProduit.price[1]
                    ? Math.round(
                        ((100 - seeProduit.price[1]) / 100) *
                          seeProduit.price[0] *
                          100
                      ) / 100
                    : seeProduit.price[0]}
                  <sup>{dataWebSite.currency}</sup>
                </span>
              </div>

              <article>{seeProduit.description}</article>
              <button
                onClick={(e) =>handelAddCart(e)}
                className="btn btn-warning btn-lg"
              >
                Ajouter au panier
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalProduit;
