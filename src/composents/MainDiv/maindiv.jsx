import React from 'react';
import Bounce from 'react-reveal/Bounce';
import dataWebSite from "../../data.json"

import './maindiv.css';


const MainDiv = ({ dataTypes, products, setCart, total, setTotal, setActiveModaleProduit, setSeeProduit }) =>{

    

    const handelAddCart = (e, product) =>
    {
        e.preventDefault();
        e.stopPropagation();

        const cart = JSON.parse(localStorage.getItem("cart"));
        let solde = 1;
        product.model = ""
        product.models.map(i =>
            product.model += i[0] + " "
        );
        if (product.price[1]) { solde = (100 - product.price[1]) / 100 }
        setTotal(Math.round((total + product.price[0] * solde) * 100) / 100)
        for (let i = 0; i < cart.length; i++)
        {
            const element = cart[i];

            if (product._id === element._id && product.model == element.model)
            {
                cart[i].count++
                return setCart(cart)
            }
        }
        product.count = 1;
        setCart([...cart, product]);

    }

    const handleSeeProd = (e, prod) =>
    {
        e.preventDefault();
        e.stopPropagation();
        setSeeProduit(prod);
        setActiveModaleProduit(true);
    }

    return (
        <main className='h-100'>
<h2 className="font-weight-light"> Produits</h2>

                {
                        
                    dataTypes.map(dataType =>
                    <section>
                    <span className="datatype-titleSectuin" >
<hr className="w-25"/>
                    <h3 className="small posion-r-top-05 fst-italic  ">{dataType.toUpperCase()} </h3>
                    <hr className="w-25"/>
                    </span>
            <ul className='allPosts'>
{
                        products.filter(p => p.type.includes(dataType)).map(product => <li key={product._id}> <Bounce left>
                            <a href='#' onClick={e => handleSeeProd(e, product)} >
                                <span className="spanImage parentSolde" style={{ 'background-image': `url(${product.image[0]})` }} >
                                    {product.price[1] && <strong className='solde-content'>-{product.price[1]}%</strong>}
                                </span>
                                <span> <h4 className="fs-6"> {product.name} </h4>
                                    <div className='text-right'> {product.price[1] && <del className='text-danger mx-2'>{product.price[0]} {dataWebSite.currency} </del>} <span className='font-big'>{product.price[1] ? Math.round((((100 - product.price[1]) / 100) * product.price[0]) * 100) / 100 : product.price[0]}<sup>{dataWebSite.currency} </sup> </span></div>
                                </span> <span className='text-center'><button onClick={e => handelAddCart(e, product)} className='btn btn-warning btn-sm  btn-block'>Ajouter au panier <i className="bi bi-cart-plus"></i> </button> </span></a>  </Bounce> </li>)
} 

            </ul>
            </section>
                    )}
        </main>
    );
};


export default MainDiv