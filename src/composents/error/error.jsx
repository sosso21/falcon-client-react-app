import React from 'react';
import cx from 'classnames';
 

const Error = ({response = {}}) => {

  if(response.error == "disconnect"){
    sessionStorage.clear()
    localStorage.clear()
     return window.location.href("/")
  }

  
   return (
     <>
     {response.success  &&
     <div className="text-center d-block alert alert-success form-group">
     {response.success}
     </div>
     }
     
     {response.error  &&
     <div className="d-block text-center alert alert-danger form-group">
     {response.error}
     </div>
     }
     </>
  );
};

 
export default Error