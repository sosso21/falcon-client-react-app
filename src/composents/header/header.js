import React,{ useState,useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import dataWebSite from "../../data.json"
import "./header.css";

const Header=() => {
  
  const [isConnect,setUsConnect]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") && sessionStorage.getItem("userInfo")) {
      setUsConnect(true);
      setIsAdmin(JSON.parse(sessionStorage.getItem("userInfo")).isAdmin)
     
    }
  },[])
  const disconnect=(e)=>{
    e.preventDefault()
    localStorage.clear() ; 
    sessionStorage.clear();;
    window.location.href = "/";
  }

  return (
    <header className="sticky">
  <Navbar className="px-4"collapseOnSelect expand="lg"bg="dark"variant="dark">
  <Navbar.Brand title="home"href="/"><img  alt="falcon-logo-white"src="/falcon.png"className="iumg-logo"/> <h1 className="small font-familly-serif-kiki text-white ">{dataWebSite.name.toUpperCase()} </h1> </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
  <Navbar.Collapse className=" justify-content-end"id="responsive-navbar-nav">
  <Nav>
      <Nav.Link title="faq"href="/legal"><i className="bi bi-question-circle-fill mx-1"></i>FAQ & aide</Nav.Link>
      
    </Nav>
   {isConnect ?
   <Nav className="mr-auto">
   {isAdmin && <Nav.Link title="mytitle"href="/admin"><i class="bi bi-gear-fill mx-1"></i>Administration</Nav.Link>}
      <Nav.Link title="partenaariat"href="/partnership"><i class="bi bi-people-fill mx-1"></i>Espace partenaire</Nav.Link>
      <Nav.Link title="Paramètres"href="/setting"><i className="bi bi-person-bounding-box mx-1"></i>Profil</Nav.Link>
      <Nav.Link title="Déconnexion"href="/"onClick={(e)=>disconnect(e)} ><i className="bi bi-person-x-fill mx-1"></i> Déconnexion</Nav.Link>
    </Nav>
    :
    <Nav className="mr-auto">
      <Nav.Link title="Connexion"href="/login"> <i className="bi bi-person-check-fill mx-1"></i>Connexion</Nav.Link>
      <Nav.Link title="Inscription"href="/signup"><i className="bi bi-person-plus-fill mx-1"></i>Inscription</Nav.Link>
    </Nav>
      
      }
   
  </Navbar.Collapse>
</Navbar>
</header>
  );
};

export default Header;

