import React from 'react';
import './list.css';
import axios from 'axios';




export default class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      logged: false,
      showError: false,
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

      return instance.post("http://localhost:8080/login", {
        
        email: this.state.email,
        password: this.state.password,
      })
        .then(response => {
          console.log("It worked the server responded with:", response.data);
          localStorage.setItem('apiToken', response.data.token);
          this.goToBoard(); // you may have to implement a way to change the route of the page or hide the form when "logged in" is true
        })
        .catch(error => {
          this.setState({error:error});
          // console.log(error, "watch me");
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
               window.location.href = "/myboard"
     }



render() {
    const isEnabled = this.canBeSubmitted();

      // const history = createHistory()

       const style = {
            textAlign: 'center',
           };


        const savedStyle2 = {
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

       };


           
        let errorMessage = ""
        if (this.state.error && this.state.password.length > 0) {
        errorMessage =  "Sorry incorrect password!" 
      
        }


  return (

       <div className="Signin" style={style}>

        <form onSubmit={this.handleSubmit}>
                
                  <h1>Showtime</h1>
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
                <button disabled={!isEnabled}>Sign In</button>
                <p>{errorMessage}</p>
                
              </form>

              </div>
        
    )
  }
}