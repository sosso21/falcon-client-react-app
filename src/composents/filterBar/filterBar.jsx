import React, { useState, useEffect } from "react";
import queryString from "query-string";

import "./filterBar.css";

const FilterBar = ({ dataTypes, setData, dataFile }) => {
  const [filter, setFilter] = useState({
    collection: "",
    q: "",
    minPrice: "",
    maxPrice: "",
    orderBy: "",
    dir: "asc",
  });

  const changeFIlter =(elements)=>{
    setFilter( {...filter , ...elements})
  }

  useEffect(() => {
    dataFile.map((d) => d.name.search(filter.q) != -1);

    dataFile = dataFile.filter(
      (d) =>
        (d.name.search(filter.q) != -1 ||
          d.description.search(filter.q) != -1 ||
          d.type.includes(filter.q)) &&
        d.price[0] >= +filter.minPrice
    );
    filter.collection &&
      (dataFile = dataFile.filter((d) => d.type.includes(filter.collection)));
    filter.maxPrice &&
      (dataFile = dataFile.filter((d) => d.price[0] <= +filter.maxPrice));
    if (filter.orderBy) {
      if (filter.orderBy == "date" && filter.dir == "asc") {
        dataFile = dataFile.sort((a, b) => a.date - b.date);
      }
      if (filter.orderBy == "date" && filter.dir == "desc") {
        dataFile = dataFile.sort((a, b) => b.date - a.date);
      }

      if (filter.orderBy == "price" && filter.dir == "asc") {
        dataFile = dataFile.sort((a, b) => a.price[0] - b.price[0]);
      }
      if (filter.orderBy == "price" && filter.dir == "desc") {
        dataFile = dataFile.sort((a, b) => b.price[0] - a.price[0]);
      }
    }
    setData(dataFile);
  }, [filter]);

  const localhost = window.location.host;
  useEffect(() => {
    const url = queryString.parse(window.location.search);
    if (url.filter && dataTypes.length && dataFile.length) {
      
      const filterUrl = url.filter.replace('_' ,'')
      
     if ( dataTypes.includes(filterUrl) ){
       
      changeFIlter({
            collection: filterUrl
          })
        }else {
        
           (window.location.href = "/" );
         }
    }
  }, [localhost, window.location.search ,dataTypes , dataFile]);

  return (
    
    <div className="w-100  form-horizontal  ">
  
      <form onSubmit={(e) => e.preventDefault()}>
      <div className="input-group">

        <input
          value={filter.q}
          onChange={(e) =>
            changeFIlter({
              q: e.target.value
            })
          }
          type="text"
          name="q"
          placeholder="Rechercher"
          className="form-control "
        />
        <button className="btn btn-link btn-sm text-primary bi bi-search">
        </button>
        
      </div>
      </form>
      <div>
      <div className="input-group">
        <select
          value={filter.collection}
          onChange={(e) =>
            changeFIlter({
              collection: e.target.value
            })
          }
          className="custom-select form-control"
        >
          <option value="">Collections</option>
          {dataTypes.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </div>
      </div>

      <div>
      <div className="input-group"> 
        <input
          value={filter.minPrice}
          onChange={(e) =>
            changeFIlter({
              minPrice: e.target.value
            })
          }
          type="number"
          name="min-price"
          placeholder="Prix minimum"
          className="form-control w-min-cont mx-1"
        />
        <input
          value={filter.maxPrice}
          onChange={(e) =>
            changeFIlter({
              maxPrice: e.target.value
            })
          }
          type="number"
          name="max-price"
          placeholder="Prix maximum"
          className="form-control w-min-cont mx-1"
        />
        </div>
      </div>

      <div>
      <div className="input-group"> 
        <select
          value={filter.orderBy}
          onChange={(e) =>
            changeFIlter({
              orderBy: e.target.value
            })
          }
          className="custom-select form-control"
        >
          <option value="">Tirer Par</option>
          <option value="date">date d'ajout</option>
          <option value="price">prix</option>
        </select>
        <button
          onClick={(e) =>
           changeFIlter({
                  dir: (filter.dir == "asc" )? "desc":"asc"
                })
                
          }
          className={` btn btn-sm btn-link text-primary bi bi-arrow-${filter.dir == "asc" ?"down":"up" }`}
        >
        </button>
      </div>
      </div>
    </div>
  );
};

export default FilterBar;




