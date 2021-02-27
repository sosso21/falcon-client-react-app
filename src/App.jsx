import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,Route} from "react-router-dom";
import  Home from './Home.jsx';
import Signin from './signin.jsx';
import Signup from './signup.jsx';
import Password from "./composents/password/password.jsx";
import session from "./composents/session/session.jsx";
import MyInfo from "./composents/myInfo/myInfo.jsx";
import Partenaire from "./composents/partenaire/partenaire.jsx";
import Admin  from "./composents/admin/admin.jsx";
import legal from "./composents/legal/legal.jsx"
import dataWebSite from "./data.json"
import notFound from "./composents/notFound/notFound.jsx"

const App =()=>{ 
  session(dataWebSite.urlServer)
  const [isConnect,setUsConnect]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") && sessionStorage.getItem("userInfo")) {
      setUsConnect(true);
      setIsAdmin(JSON.parse(sessionStorage.getItem("userInfo")).isAdmin)
     
    }
  },[])

  return (
    <>
    
    <Router>
<Route path="/" exact component={Home} />
<Route path="/home" component={Home} />
<Route path='/password' component={Password}/> 
<Route path='/legal' component={legal}/> 
<Route path='/404' component={notFound}/> 
  </Router>

  {!isConnect ?
<Router> 
  <Route path='/signin' component={Signin}/>
<Route path='/signup' component={Signup}/>
<Route path='/login' component={Signin}/>
<Route path='/logup' component={Signup}/>
   </Router>
   : <Router> 
  <Route path='/partnership' component={Partenaire}/>
  <Route path='/setting' component={MyInfo}/>
{isAdmin &&  <Route path='/admin' component={Admin}/>}
   </Router>
  }
  
</>
  )
}

export default App;