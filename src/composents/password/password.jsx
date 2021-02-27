import React,{ useState,useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import queryString from "query-string";
import Flip from 'react-reveal/Flip';
import dataWebSite from "../../data.json"

const Password=() => {

  const [missingPassState,setMissingPassState]=useState(1)
  const [mpInfo,setMpInfo]=useState({ omp: "",mp1: "",mp2: "" })
  const [err,setErr]=useState('')


  const resetPass=(e) => {
    e.preventDefault()
    if (mpInfo.mp1!=mpInfo.mp2) {
      return setErr("les mots de passes ne sont pas identiques")
    }

    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        authorization: queryString.parse(window.location.search).token,
        pass: mpInfo.mp1
      }).toString()
    };

    fetch(`${dataWebSite.urlServer}/api/resetPasswordForget`,header)
      .then(res => res.json())
      .then((result) => {
        setErr(result.response)
        if (result.response=="success") {
          setTimeout(() => {
            setMissingPassState(3)
          },3000);
        } 

      },
        (err) => {
          console.log('Une erreur c\' est produit:',err)
        }
      )
  }

  const resetWhithOldPass =(e)=>{
    e.preventDefault();
    if (mpInfo.mp1!=mpInfo.mp2) {
      return setErr("les mots de passes ne sont pas identiques")
    }
    
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        operation :'password',
        token: localStorage.getItem("token"),
        form: JSON.stringify({
        pass:  mpInfo.omp,
        newPass: mpInfo.mp1
      })}).toString()
    };
    
    fetch(dataWebSite.urlServer+"/api/updateUser" ,header)
      .then(res => res.json())
      .then((result) => {
        console.log('====================================');
        console.log(result);
        console.log('====================================');

        result.response ?  setErr(result.response) :  setErr(result.error)

        if (result.response=="success") {
          setTimeout(() => {
            setMissingPassState(3)
          },3000);
        }

      },
        (err) => {
          console.log('Une erreur c\' est produit:',err)
        }
      )

  }

  const sendEmail =(e)=>{
    e.preventDefault()
    const email = JSON.parse(sessionStorage.getItem("userInfo")).email

    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        email : email
    }).toString()
    };
    
    fetch(dataWebSite.urlServer+"/api/sendEmailToResetPwd" ,header)


  }

  useEffect(() => {
    const url=queryString.parse(window.location.search);
    if (url.token) {
      setMissingPassState(2);

    }
  },[])


  return (
    <main className="flex-verticaly">
      <Header />
      <section className="container text-center sign-flex">
        <h1 className="font-weight-light my-4">Redéfinissez votre mot de passe</h1>


        {(missingPassState==1)&&<div>
          <Flip right>
            <form className='text-center my-4' onSubmit={e => resetWhithOldPass(e)}>
              <div className="input-group my-1">
                <input value={mpInfo.omp} onChange={e => setMpInfo({ omp: e.target.value,mp1: mpInfo.mp1,mp2: mpInfo.mp2 })} type="password" placeholder='Ancien mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp1} onChange={e => setMpInfo({ mp1: e.target.value,omp: mpInfo.omp,mp2: mpInfo.mp2 })} type="password" placeholder='Nouveau mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp2} onChange={e => setMpInfo({ mp2: e.target.value,mp1: mpInfo.mp1,omp: mpInfo.omp })} type="password" placeholder='confirmez le mot de passe' className="form-control w-100" required />
              </div>
              {err&&<div>
                {(err=="success")? <p className="alert alert-success">mot de passe modifier avec succès ! </p>:<p className="alert alert-danger"> {err} 
</p>}
              </div>}
   <p>Mot de passe oublié ? <i onClick={e=>sendEmail(e)} className="pointer text-primary"> Envoyer un email </i> </p>
              <button type="submit" className="btn-lg btn btn-primary">Réinitialiser</button>
            </form>
          </Flip>
        </div>}

        {(missingPassState==2)&&<div>
          <Flip right>
            <form className='text-center my-4' onSubmit={e => resetPass(e)}>
              <div className="input-group my-1">
                <input value={mpInfo.mp1} onChange={e => setMpInfo({ mp1: e.target.value,omp: mpInfo.omp,mp2: mpInfo.mp2 })} type="password" placeholder='Nouveau mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp2} onChange={e => setMpInfo({ mp2: e.target.value,mp1: mpInfo.mp1,omp: mpInfo.omp })} type="password" placeholder='confirmez le mot de passe' className="form-control w-100" required />
              </div>
              {err&&<div>
                {(err=="success")? <p className="alert alert-success">mot de passe modifier avec succès ! </p>:<p className="alert alert-danger"> {err}</p>}

              </div>}
              <button type="submit" className="btn-lg btn btn-primary">Réinitialiser</button>
            </form>
          </Flip>
        </div>}

        {(missingPassState==3)&&<div align="center" className="mb-5 text-success" >
          <Flip cascade>
            <i>
              <svg width="10rem" height="10rem" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </i>
          </Flip>
        </div>}
      </section>
      <Footer />
    </main>
  );
};

export default Password