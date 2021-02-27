import React ,{useState , useEffect} from 'react';
import Header from "../header/header"
import Footer from "../footer/footer"
import Affiliation from './Aafiliation/affiliation.jsx'
import Payment from './askToPay/asktoPay.jsx'
import Newsletter from './newsletters/newsletter.jsx';
import dataWebSite from "../../data.json"

const linkDb =dataWebSite.urlServer+"/admin/plugins/content-manager/collectionType/application::client.client"
const clientLinkDB =dataWebSite.urlServer+ '/admin/plugins/content-manager/collectionType/application::client.client/'
 

const Admin = () =>{
  const [actifOnglet , setOnglet] = useState('Affiliation')
  const [AffiliationReq, setAffiliationReq] = useState([])
  const [AskToPayReq, setAskToPayReq] = useState([])
  
  const callBackResult = (result) => {
    if(result.error=="disconnect"){
    sessionStorage.clear();
     localStorage.clear();
     return window.location.pathname ='/'
    }
    setAffiliationReq(result.Affiliates)
    setAskToPayReq(result.AskToPay)
  }

  useEffect(() => {
    fetch(dataWebSite.urlServer+"/api/getAffiliationProgramInfo",{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          token: localStorage.token
        }).toString()
      })
        .then(res => res.json())
        .then((result)=>{
          callBackResult(result)}
          ,
          (err) => {
            console.log('Une erreur c\' est produit:',err)
          }
        )
    }, [])
  
const handleEditUser=(e,operation,idUser)=>{
  e.preventDefault()
  fetch(dataWebSite.urlServer+"/api/admin/setUser",{
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams({
      token: localStorage.token,
      op: operation,
      idUser : idUser
      
    }).toString()
  })
    .then(res => res.json())
    .then(result=>{
      callBackResult(result)}
      ,
      (err) => {
        console.log('Une erreur c\' est produit:',err)
      }
    )
}
    


  return (
    <>
      <main className="flex-verticaly">
        <Header />
<nav> <h1 className="font-weight-light p-4">Panneau d'administrateurs</h1>
        <ul className="nav nav-tabs nav-fill">
        { ["Affiliation" ,"Paiement" ,"Newsletter"].map(item=>
          <li className="nav-item">
    <a onClick={e=>{ e.preventDefault();  setOnglet(item)}} className=
        { (actifOnglet== item) ? 'nav-link active' : ' nav-link' } href={'#'+item}>{item}</a>
  </li>
        )}
        
        
</ul>
  </nav>



        <div className=" mx-auto vw-90 min-vh-75">
        {(actifOnglet== "Affiliation") &&  <Affiliation handleEditUser={handleEditUser} users={AffiliationReq} linkDb={linkDb} clientLinkDB={clientLinkDB}  /> }

        {(actifOnglet== "Paiement") &&  <Payment handleEditUser={handleEditUser} users={AskToPayReq} linkDb={linkDb} clientLinkDB={clientLinkDB} /> }

        {(actifOnglet== "Newsletter") &&  <Newsletter/> }
        </div>

        <Footer />
      </main>


    </>
  );
};




export default Admin