const session =(url) =>{


  const token = localStorage.getItem("token");
  if (token && !sessionStorage.getItem("userInfo")) { 
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
      token:token
      }).toString()
    };

    fetch( `${url}/api/connect`,header )
      .then( res => res.json() )
      .then(result=> {
        console.log('result : ' ,result)
        if ( result.error=='disconnect' ) {
         return  localStorage.clear();
        }
        if ( result.token!=undefined ) { 
          localStorage.setItem( "token",JSON.stringify(result.token ));
          sessionStorage.setItem("userInfo",JSON.stringify(result.userInfo));
        }
      },
        ( err ) => {
          console.log( 'Une erreur c\' est produit:',err )
        }
      )
  }
}

module.exports = session;