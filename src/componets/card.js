import React from 'react';
import { Link } from 'react-router-dom';

  


export default function card(props) {
    
     const style = {
      textAlign: 'center',
    
     };
      const style2 = {

        color: '#3E0902',
      }
    return (
    
          <div className="card" style={style}>
                         {props.text}
           <h2 style={style2}> You should get access to this page only after authentication.</h2>
               <Link style={style2}  to="/signin">Go Sign In</Link>
        </div>
      );    
  };



