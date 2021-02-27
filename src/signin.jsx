import React,{useState,useEffect} from 'react';
import Header from "./composents/header/header";
import Footer from "./composents/footer/footer";
import Modal from 'react-bootstrap/Modal';
import dataWebSite from  "./data.json";


const Signin=() => {
  const [ log,setLog ]=useState( {email: '',pass: ''} );
  const [ seePass,setSeePass ]=useState( false );
  const [ errorLogin,setErrorLogin ]=useState("");
  const [ show,setShow ]=useState( false ) 
  const [ mpEmail,setMpEmail ]=useState("")
  const [ mpError,setmpError ]=useState('')

  const sendEmaillToConfirm=() => {
    fetch( dataWebSite.urlServer+"/api/sendMeEmailConfirmation",{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams( {
        email: log.email
      } ).toString()
    } )
  }

  const onConnect=(e) => {
    e.preventDefault();
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams( {
        email: log.email,
        pass: log.pass
      } ).toString()
    };
    fetch( `${dataWebSite.urlServer}/api/connect`,header )
      .then( res => res.json() )
      .then( ( result) => {
        
        if ( result.error==-1 ) {
          setErrorLogin(-1)
          return sendEmaillToConfirm()
        }
        if ( result.token!= undefined ) {
          localStorage.setItem( "token",JSON.stringify(result.token) );
          sessionStorage.setItem( 'userInfo',JSON.stringify(result.userInfo) );
          return window.location.href ="/"

        } else if ( result.error != undefined ) {
          setErrorLogin(  result.error )
        }
      },
        ( err ) => {
          console.log( 'Une erreur c\' est produit:',err )
        }
      )
  }

  const sendEmailToMp=(e) => {
    e.preventDefault()
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams( {
        email:mpEmail
      } ).toString()
    };

    fetch( `${dataWebSite.urlServer}/api/sendEmailToResetPwd`,header )
      .then( res => res.json() )
      .then( ( result ) => {
        setmpError(result.response)

      },
        ( err ) => {
          console.log( 'Une erreur c\' est produit:',err )
        }
      )
  }

  
  return (
    <>
      <main className="bg-signin flex-verticaly">
        <Header />
        <section className="container sign-flex text-center">
          <h2 className="font-weight-light my-4 text-white">Connectez vous</h2>


          <form onSubmit={e => onConnect( e )} >
       
            <div className="input-group my-1">
              <input value={log.email} onChange={e => setLog( {email: e.target.value,pass: log.pass} )} type="email" className='form-control' placeholder='email' />
            </div> 
            
            <div className="input-group my-1">
              <input value={log.pass} onChange={e => setLog( {email: log.email,pass: e.target.value} )} type={seePass? 'text':'password'} className='form-control ' placeholder='mot de passe' />
           
           </div>
           <div className="input-group ">
              <i onClick={() =>   setSeePass( !seePass )}  className={`text-primary   eyes-item  bi  ${seePass ? "bi-eye-fill":"  bi-eye-slash-fill" } `} ></i>
            </div>
             
            <i onClick={() => setShow(true)} className=' btn btn-link my-4' href="#">Mot de passe oublié?</i>
            <div className="form-groi">
              {
                errorLogin &&
                <div className="text-center alert alert-danger input-group">
                  {errorLogin!=-1 ? <p className="text-center w-100"> {errorLogin} </p>
                    :
                    <p className="text-center w-100">Confirmez votre email ! un lien a été envoyer à {log.email} <i className='btn btn-link' onClick={e => {e.preventDefault(); sendEmaillToConfirm()}}>Renvoyer </i></p>
                  }
                </div>
              }
            </div>
            <button type='submit' className="my-4 btn-lg btn  btn-primary">Connexion</button>

          </form>
        </section>

        <aside>
          <Modal
            show={show}
            onHide={() => setShow( false )}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                <h2 className="my-4 font-weight-light">Réinitialisez votre mot de passe </h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
               <div>
                <form className='text-center my-4' onSubmit={e => sendEmailToMp( e )}>
                  <div className="input-group ">
                    <input value={mpEmail} onChange={e => setMpEmail( e.target.value)} type="email" placeholder='email' className="form-control " required />
                  </div>
                  {mpError &&
                  
                  <div >
                    {( mpError=="success" )? <p className="alert alert-success">email envoyé!</p>:<p className="alert alert-danger"> {mpError}</p>}

                  </div>}
                  <button type="submit" className="btn-lg btn btn-primary my-4">Réinitialiser</button>
                </form>
              </div> 
            </Modal.Body>
          </Modal>
        </aside>
        <Footer />
      </main>
    </>
  );
};

export default Signin 