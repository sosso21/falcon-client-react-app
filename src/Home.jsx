import React, {
  useState,
  useEffect
} from "react";
import queryString from "query-string";
import Header from "./composents/header/header";
import Footer from "./composents/footer/footer";
// import dataFile from "./data.json";
import MainDiv from "./composents/MainDiv/maindiv.jsx";
import AsideBar from "./composents/AsideBar/asidebar.jsx";
import FilterBar from "./composents/filterBar/filterBar.jsx";
import ModalProduit from "./composents/ModalProduit/ModalProduit.jsx";
import Spiner from "./composents/spiner/Spiner.jsx";
import DoCommand from "./composents/doCommand/doCommand.jsx";
import dataWebSite from "./data.json";

const Home = () => {
  const url = queryString.parse(window.location.search);
  const [dataFile, setDataFile] = useState("");
  const [dataTypes, setDataType] = useState([]);

  useEffect(() => {
    fetch(dataWebSite.urlServer +"/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          let type = [];
          for (let i = 0; i < result.length; i++) {
            const e = result[i];
            for (let j = 0; j < e.type.length; j++) {
              const t = e.type[j];
              const v = type.includes(t);
              !v && (type = [...type, t]);
            }
          }

          type = type.sort();

          setDataType(type);
          setDataFile(result);
        },
        (err) => {
          document.location.href = "/404";
        }
      );
  }, []);

  const [data, setData] = useState(dataFile);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeModaleProduit, setActiveModaleProduit] = useState(false);
  const [seeProduit, setSeeProduit] = useState("");
  const [ActiveCommand, setActiveCommand] = useState(false);
  const [codePromo, setCodePromo] = useState(0);

  useEffect(() => {
    if (url.promo && dataFile && codePromo === 0) {
      const a = fetch(dataWebSite.urlServer+"/api/promo/purcent", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams({
          code: url.promo,
        }).toString(),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            const reduction = result.reduction;
            
            if (reduction <= 0) {
              return setCodePromo(-1);
            }
            setCodePromo(1);
            let df = [];

            for (let i = 0; i < dataFile.length; i++) {
              let element = dataFile[i];
              if (element.price[1] == false) {
                element.price[1] = reduction;
              } else {
                element.price[1] = element.price[1] + reduction;
              }
              df[i] = element;
            }
            setDataFile(df);
          },
          (err) => {
            console.log("err:", err);
            return setCodePromo(-1);
          }
        );
    }
  }, [dataFile]);

  useEffect(() => {
    const myCart = localStorage.getItem("cart");
    const myTotal = localStorage.getItem("total");

    myCart && setCart(JSON.parse(myCart));
    myTotal && setTotal(JSON.parse(myTotal));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
    
  }, [total, cart]);

  useEffect(() => {
    if (url.produit && dataFile) {
      const produitUrl = url.produit;

      const ObjProdOnUrl = dataFile.find((i) => i._id == produitUrl);
      if (ObjProdOnUrl) {
        setSeeProduit(ObjProdOnUrl);
        setActiveModaleProduit(true);
      }
    }
  }, [url, dataFile]);

  return (
    <>
      {dataFile ? (
        <main className="bg-body flex-verticaly">
          <Header />
          <div className=" mx-auto vw-90 main-flex">
            {dataFile && (
              <FilterBar
                dataTypes={dataTypes}
                setData={(cmd) => setData(cmd)}
                dataFile={dataFile}
              />
            )}
            {data && (
              <MainDiv
              dataTypes={dataTypes}
                products={data}
                setCart={(C) => setCart(C)}
                total={total}
                setTotal={(t) => setTotal(t)}
                setActiveModaleProduit={(cmd) => setActiveModaleProduit(cmd)}
                setSeeProduit={(cmd) => setSeeProduit(cmd)}
              />
            )}
            <AsideBar
              cart={cart}
              setCart={(e) => setCart(e)}
              total={total}
              setTotal={(t) => setTotal(t)}
              setActiveCommand={(e) => setActiveCommand(e)}
            />
          </div>
          {seeProduit && (
            <ModalProduit
              show={activeModaleProduit}
              setShow={(cmd) => setActiveModaleProduit(cmd)}
              seeProduit={seeProduit}
              setCart={(cmd) => setCart(cmd)}
              total={total}
              setTotal={(t) => setTotal(t)}
            />
          )}
          {cart && (
            <DoCommand
              show={ActiveCommand}
              setShow={(e) => setActiveCommand(e)}
              cart={cart}
            />
          )}

          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};

export default Home;
