import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'
import Board from './board';




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
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  }

canBeSubmitted() {
    const { email, password } = this.state;
    return (
      email.length > 0 &&
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
       <Router>
       <div> 
       <Route exact path="/" render={() => <Redirect to="/board" />} />
       <Route exact path="/myboard" component={Board} />
     <Route exact path="/board" render={() => (
       this.state.logged ? (
        <Redirect to="/myboard"/>
        ) : (
          <div className="list" style={style}>


            <form onSubmit={e => this.goToBoard(e)}>
                
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
        )
     )} />
         </div>
         </Router>
    )
  }
}