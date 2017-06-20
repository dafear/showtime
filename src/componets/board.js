import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Code7 from './code7';
import { connect } from 'react-redux';
import { search } from '../actions/search'
// import Classie from './classie';
// import Code7 from './code7';
// import Modernizr from './modernizr.custom';
import './board.css';
// import './demo.css';

import axios from 'axios';

class Board extends React.Component {
  state = { term: '', venues: [] };
  
  onChange = (e) => {
    this.setState({ term: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.term)
    const URL = `https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994,%2074.2179&near=New%20York,%20Ny&query=${this.state.term}&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm`;
 
    return axios.get(URL)
    .then(response => {
      console.log(response)
      if(response.data.response) {
        this.filterVenues(response.data.response.venues)
      }

    });
  }

   filterVenues(venues) {
   
   let places = []
   
   let contegrityID = ["4d4b7104d754a06370d81259","4bf58dd8d48988d1e5931735","4bf58dd8d48988d1e7931735","4bf58dd8d48988d1e8931735","4bf58dd8d48988d1e9931735","5267e4d9e4b0ec79466e48d1","4bf58dd8d48988d18e941735","4bf58dd8d48988d1f2931735","4bf58dd8d48988d137941735","5032792091d4c4b30a586d5c","507c8c4091d498d9fc8c67a9","4bf58dd8d48988d136941735","4bf58dd8d48988d135941735","4bf58dd8d48988d11f941735",]
   console.log(venues)
   venues.filter(function(venueItem) {
    console.log(venueItem)

    venueItem.categories.forEach(function(category) {
    if (contegrityID.includes(category.id)) {
    console.log(category.id)
        places.push(venueItem);
     } 
    })
    return venueItem;
  })

  this.setState({venues: places}) 
  
 }


  canBeSubmitted() {
    const { term } = this.state;
    return (
      term.length > 0 
    
    );
  }

  render() {
    const style = {
      textAlign: 'center',
    };

  
   let venues = [];

    this.state.venues.forEach((venue, i,) => {
      venues.push( 
        <li key={i}>
        <a target='_blank' href={venue.url}>{ venue.name}</a>
          <p> { venue.name } </p>
           <p> { venue.location.address } </p>
           <p> { venue.location.city } </p>


         </li>);
        
    });

     const isEnabled = this.canBeSubmitted();

     
    
    return (
      <div className="board" style={style}>
        <div>
          <form onSubmit={this.onSubmit}><input value={this.state.term} onChange={this.onChange} />
           <button disabled={!isEnabled}>Search</button>
          
          </form>
          

          { venues }

        </div>
      </div>
      
    )

  }
}


export default connect(undefined, { search })(Board)


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