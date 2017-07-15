import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Board from './board';
import Saved from './saved'; 
import Signin from './signin';
import Card from './card';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './real.css';





export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      logged: false,
    
    };
  }

handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

handleSubmit = (evt) => {
    if (this.canBeSubmitted()) {
      var instance = axios.create({ headers: { 'Content-Type': 'application/json' } });
      evt.preventDefault();
      console.log(this.state.email);
      console.log(this.state.password);

      return instance.post("http://localhost:8080/register/register", {
        
        email: this.state.email,
        password: this.state.password,
      })
        .then(response => {
          console.log("It worked the server responded with:", response);
          this.goToBoard(); 
        })
        .catch(function (error) {
          console.log(error);
        });
      // return;
    } else {
      alert("You need an email and password");

    }
   }
canBeSubmitted() {
    const { email, password } = this.state;
    return (
      email.length > 0 &&
      password.length > 0
    );
  }

 goToBoard() {
           // event.preventDefault();
        if(this.canBeSubmitted()) {this.setState({logged: true})}
               window.location.href = "/card"
     }

render() {
    const isEnabled = this.canBeSubmitted();

    

       const style = {
            textAlign: 'center',
           };
        
      const savedStyle = {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#99c5ff',
        borderRadius: 5,
        width: 75,
        textAlign: 'center',
        padding: 5,
        bottom: 20,
        margin: "auto",
        color: 'white',
        fontSize: 18, 
       };
    

  return (
       <Router>
       <div> 
       <Route exact path="/" render={() => <Redirect to="/board" />} />
          <Route exact path="/saves" component={Saved} />
           <Route exact path="/signin" component={Signin} />
             <Route exact path="/card" component={Card} />        
           <Route exact path="/myboard" component={Board} />
         <Route exact path="/board" render={() => (
         this.state.logged ? (
          <Redirect to="/myboard"/>
            ) : (

              <div className="list" style={style}>


               <form onSubmit={this.handleSubmit}>
                
                  <h1>Showtime</h1>
                   <h2 className="subtitle"> Sign up for access to the best shows in any genre!</h2>
              <input
                  type="text"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                /><br/>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                /><br/>
                <button disabled={!isEnabled}>Sign up</button>

               <Link  style={savedStyle} to="/signin">Sign In</Link>
              </form>
              </div>
        )
     )} />
         </div>
         </Router>
    )
  }
};