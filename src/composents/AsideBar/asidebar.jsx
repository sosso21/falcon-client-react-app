import React ,{useState} from 'react';
import Fade from 'react-reveal/Fade';
import dataWebsite from "../../data.json"

import './asidebar.css';

const AsideBar = ({cart,setCart,total,setTotal,setActiveCommand}) => {
const [seeBasket , setSeeBasket]=useState(false)
    const handeleRemoveElemntFromCart=(e,i)=>{
        e.preventDefault();
        e.stopPropagation();
        const index = cart.indexOf(e=> e._id == i._id)
        cart.splice(index,1)
        setCart(cart)
        
        let t = 0 
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            let sold =  1;
           if(element.price[1] ){ sold = (100- element.price[1] )/100}
            let  priceAfterSold = element.price[0] * sold
            t+= ( priceAfterSold*element.count)
        }
        setTotal(Math.round(t*100)/100)
    }
    

    
    return (
        <aside>
        <section>
<span className="w-100 d-flex  justify-content-between"><Fade right> <h2  className={` font-weight-light ${!seeBasket && 'd-none' }`}>Panier </h2></Fade><span> <i  onClick={()=>setSeeBasket(!seeBasket)} className="bi bi-cart4 icon-basket 
 pointer"></i>{(cart.length>0) && <i className="red-notif">{cart.length}</i>} </span></span>

        { seeBasket && (cart.length==0 ? <Fade top> <p className='text-center alert alert-danger'>Votre panier est vide <i className=" bi bi-cart-x "></i></p></Fade> :
        <ul className='w-100 list-cart'>
        <li className=' py-4  border-bottom border-danger'> <Fade left><span>{cart.length} élément(s) </span> <button onClick={e=>{e.preventDefault(); setCart([]) ;setTotal(0)  }} 
        className='btn btn-danger btn-sm bi bi-x' aria-label='CLose'>
        
        
</button></Fade></li>

{cart.map(i=><Fade top><li key={i._id} className="py-1 card croll-div  text-right w-100" >




 <img className="card-img-top rounded" width='100px' src={i.image[0]} alt={i.name}/>  
  <div classNAme="card-body  ">
  <strong className='mx-2' >{i.name} </strong>
 
 
  


  <span   className="d-block mx-2">
<p className="d-block">{i.model}</p>
         {i.price[1] ? Math.round((((100-i.price[1])/100)*i.price[0])*100)/100 : i.price[0] }{dataWebsite.currency} x {i.count}  
        </span>

        <button onClick={e=> handeleRemoveElemntFromCart(e,i) } className='btn btn-outline-danger btn-block  btn-sm bi bi-trash-fill'> </button>

        
       
        
  </div>
  
  

</li></Fade>
)}


        <li className="d-flex text-center justify-content-center py-4"> <Fade right><p className='w-100'>Total: {total}{dataWebsite.currency} </p> <button onClick={()=>setActiveCommand(true)} className=' btn-lg btn btn-block btn-warning'>Commander <i class
        ="bi bi-cart4"></i> </button></Fade></li>
        </ul>)
         }
         </section>
        </aside>
    );
};



export default AsideBar
