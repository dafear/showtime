import React from 'react';
import Board from './board';
import Saved from './saved';
import axios from 'axios';
import './list.css';


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
      evt.preventDefault();

      axios.post("http://localhost:8080/login", {
        // userName: this.state.email,  username won't work here
        email: this.state.email,
        password: this.state.password,
      })
        .then(response => {
          console.log("It worked the server responded with:", response);
          this.goToBoard(); // you may have to implement a way to change the route of the page or hide the form when "logged in" is true
        })
        .catch(function (error) {
          console.log(error);
        });
      // return;
    } else {
      alert("You need an email and password");
    }
    // const { email, password } = this.state;
    // alert(`Signed up with userName: ${email} password: ${password}`);
  }

  canBeSubmitted() {
    const { email, password } = this.state;
    return (
      email.length > 0 &&
      password.length > 0
    );
  }

  // goToBoard(event) { (removed Event)
  goToBoard() {
    // event.preventDefault();
    if (this.canBeSubmitted()) { this.setState({ logged: true }) }
  }


  render() {
    const isEnabled = this.canBeSubmitted();


    const style = {
      textAlign: 'center',
    };

    return (
      <div style={style}>
        {/*<form onSubmit={e => this.goToBoard(e)}>*/}      
        <form onSubmit={this.handleSubmit}>

          <h1>Showtime</h1>
          <input
            type="text"
            placeholder="Enter email"
            value={this.state.email}
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



























