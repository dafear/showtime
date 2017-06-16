import React from 'react';
import { NavLink } from 'react-router-dom';
// import Code7 from './code7';
 import {connect} from 'react-redux';
import {search} from '../actions/search'


import './board.css';



class Board extends React.Component {
  state = {term:''}
   onChange = (e) => {
    this.setState({term: e.target.value})
    } 
    onSubmit = e => {
      e.preventDefault()
      this.props.search(this.state.term)
    }
  render() {

      const style = {
            textAlign: 'center',
           };


    return ( 

                 <div className="board" style={style}>


      <div>

      <form onSubmit={this.onSubmit}><input value={this.state.term} onChange={this.onChange} /></form></div>

          </div>
    )

  }
}


export default connect(undefined,{search})(Board)


// export default function Board() {

//        const style = {
//              textAlign: 'center',
//            };

//     return (
          
          
//               <div className="board" style={style}>
//         <div>
           
          
//              <h1><NavLink to="/">Find a show in NYC</NavLink></h1>
//         (e.g. music, comedy, theater)
//          <p>play around with related terms and get more results</p>
//            <form className="js-search-form">
            

//              <label for="query"></label>
//          <input type="text" name="searchQuery" class="js-query" id="searchInput"></input><br></br>
//       <input id="trigger-overlay" type="submit" class="enableOnInput" disabled="disabled"></input>
      
      
//   </form>

//        <div class="overlay overlay-hugeinc"> 
//                  <button type="button" class="overlay-close">Close</button> 
//                <button type="button" class="button-save">save search</button>
//       <div class="js-search-results">
    
//     </div>
//   </div>
//   </div>
//  </div>
  



//     );
// }