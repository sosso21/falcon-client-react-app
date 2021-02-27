import React,{ useState,useEffect } from 'react';
import Header from "./composents/header/header";
import Footer from "./composents/footer/footer";
import Flip from 'react-reveal/Flip';
import Error from "./composents/error/error.jsx"
import dataWebSite from "./data.json";

const Signup=() => {
  
  
  const [log,setLog]=useState({ condition: false,name: '',lastname: '',email: '',pass1: '',pass2: '' });
  const [seePass1,setSeePass1]=useState(false);
  const [seePass2,setSeePass2]=useState(false);
  const [errorLogin,setErrorLogin]=useState('');

  const [PageState,setPageState]=useState(1);

  const changeLog =(element)=>{
    setLog({...log, ...element})

  }
  const handleSubmit=(e) => {

    e.preventDefault();
    e.stopPropagation();
    if (log.pass1!=log.pass2) {
      return setErrorLogin({ error: 'les mots de passes ne sont pas indentique' })
    }

    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        firstname: log.name,
        lastname: log.lastname,
        email: log.email,
        pass: log.pass1
      }).toString()
    };

    fetch(dataWebSite.urlServer+"/api/register",header)
      .then(res => res.json())
      .then(
        (result) => {

          setErrorLogin(result)
          if (result.success!=undefined) {
            setPageState(2)
          }
        },(err) => {
        console.log('Une erreur c\' est produit:',err)
      }
      )
  }

  const resendEnmail=(e) => {
    e.preventDefault()
    fetch(dataWebSite.urlServer+"/api/sendMeEmailConfirmation",{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        email: log.email
      }).toString()
    })
      .then(res => res.json())
      .then((result) => {
        console.log('result;:',result)
      },
        (err) => {
          console.log('Une erreur c\' est produit:',err)
        }
      )
  }


  return (
    <>
      <main className="bg-signup flex-verticaly">
        <Header />
        <section className="container sign-flex text-center my-4">

          {(PageState==1)? <form onSubmit={e => handleSubmit(e)} >
            <h2 className="font-weight-light my-4 text-white">Inscrivez vous</h2>
            
            <div className="input-group my-1">
              <input value={log.name} onChange={e => changeLog({ name: e.target.value})} type="text" className='form-control' placeholder='Nom' required />
            </div> 

            <div className="input-group my-1">
              <input value={log.lastname} onChange={e => changeLog({ lastname: e.target.value })} type="text" className='form-control ' placeholder='Prénom' required />
            </div>

            <div className="input-group my-1">
              <input value={log.email} onChange={e => changeLog({ email: e.target.value})} type="email" className='form-control' placeholder='Email' required />
            </div>

            <div className="input-group my-1">
              <input value={log.pass1} onChange={e => changeLog({  pass1: e.target.value })} type={seePass1? 'text':'password'} className='form-control' placeholder='Mot de passe (min 8 caractères)' required />
            </div>

            <div className="input-group ">
              <i onClick={() =>  setSeePass1(!seePass1) }  className={`text-primary   eyes-item  bi  ${seePass1 ? "bi-eye-fill":"  bi-eye-slash-fill" } `} ></i>
 </div>


            <div className="input-group my-1">
              <input value={log.pass2} onChange={e => changeLog({  pass2: e.target.value  })} type={seePass2? 'text':'password'} className='form-control ' placeholder='Confirmez le  Mot de passe' required />
            </div>
            
           <div className="input-group ">
              <i onClick={() =>  setSeePass2(!seePass2) }  className={`text-primary   eyes-item  bi  ${seePass2 ? "bi-eye-fill":"  bi-eye-slash-fill" } `} ></i>
 </div>


            <label className="text-white" htmlFor="conditions"><input onChange={() => changeLog({ condition: !log.condition })} checked={log.condition} className="form-check-input" type="checkbox" required id="conditions" /> J'admet avoir lûs et accepter
             <a href="/legal/conditions" title="Condituins et termes d'utilisation" > les Condituins et termes d'utilisation</a></label>

              {errorLogin.error&&<Error response={errorLogin}/>
              }
            <div className="input-group ">
              <button   className=" m-auto  my-4 btn btn-lg  btn-primary">S'inscrir</button>

            </div>
          </form>:
            <div align="center" className="mb-5 text-success">
              <Flip>
              <i  style={{"font-size" :"20rem" }}  className="d-block bi bi-check-circle-fill"> </i>
                   
              </Flip>
               <span className="text-white">{errorLogin.success}.
                <i onClick={e => resendEnmail(e)} className="btn text-primary  "> Renvoyer ?</i> </span>
               
            </div>
          }
        </section>


        <Footer />
      </main>
    </>
  );
};

export default Signup
 