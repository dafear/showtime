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
      // console.log(this.state.email);
      // console.log(this.state.password);

      return instance.post('https://showtime-api-mdemtgetxd.now.sh/login', {
        
        email: this.state.email,
        password: this.state.password,
      })
        .then(response => {
          console.log("It worked the server responded with:", response.data);
          localStorage.setItem('apiToken', response.data.token);
          localStorage.setItem('email', this.state.email);
          if (response.data.term) {
             localStorage.setItem('term', response.data.term);
          }

          
          this.goToBoard();

        })
        
        .catch(error => {
          this.setState({error:error});
         
        });
     
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
             
            if(this.canBeSubmitted()) {this.setState({logged: true})}
                   window.location.href = "/myboard"
         }



    render() {



    const isEnabled = this.canBeSubmitted();

     
       const style = {
            textAlign: 'center',
           };




           
        let errorMessage = ""
          if (this.state.error && this.state.password.length > 0) {
            errorMessage =  "Sorry incorrect password!" 
      
        }


  return (

       <div className="Signin" style={style}>

           <form onSubmit={this.handleSubmit}>
                
                  <h1>SHOWTIME</h1>
                  <h2>Get ready to rock and roll!</h2>

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