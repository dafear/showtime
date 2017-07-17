import React from 'react';
import { Link } from 'react-router-dom';




export default function card(props) {

  
    

     const style = {
      textAlign: 'center',
    
     };
  




    return (

      
        <div className="card" style={style}>
        {props.text}
           <h1>"You should get access to this page only after authentication."</h1>

             <Link  to="/signin">Go Signin</Link>
        </div>
    );

   
  }



