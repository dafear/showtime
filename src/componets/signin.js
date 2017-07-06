import React from 'react';
// import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'
 import Board from './board';
 import Saved from './saved'; 
// import { search } from '../actions/search'
import axios from 'axios';



import './list.css';


export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      logged: false,
    };
  }



handleEmailChange = (evt) => {
    this.setState({ userName: evt.target.value });
  }

handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();

    axios.post("localhost:8080/login", {
    userName: this.state.userName,
    password: this.state.password,
    

  })
  .then(response => {
    console.log("It worked the server responded with:");
  })
  .catch(function (error) {
    console.log(error);
  });



      return;
    }
    const { userName, password } = this.state;
    alert(`Signed up with userName: ${userName} password: ${password}`);
  }

canBeSubmitted() {
    const { userName, password } = this.state;
    return (
      userName.length > 0 &&
      password.length > 0
    );
  }

 goToBoard(event) {
           event.preventDefault();
        if(this.canBeSubmitted()) {this.setState({logged: true})}

     }


   





render() {
     const isEnabled = this.canBeSubmitted();

      // const history = createHistory()

        const style = {
            textAlign: 'center',
            };



  return (
        <div>
          


      <form onSubmit={e => this.goToBoard(e)}>
                
                  <h1>Showtime</h1>
              <input
                  type="text"
                  placeholder="Enter userName"
                  value={this.state.userName}
                  onChange={this.handleEmailChange}
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <button disabled={!isEnabled}>Sign up</button>
              </form>

















        </div>
     
        
         
 ); 
}
}


