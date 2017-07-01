import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Code7 from './code7';
import { connect } from 'react-redux';
import { search } from '../actions/search'
import { Link } from 'react-router-dom'
 //import Classie from './classie';
 //import Code7 from './code7';
 //import Modernizr from './modernizr.custom';
import './board.css';
import './demo.css';

import axios from 'axios';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.saveVenues = this.saveVenues.bind(this);
  }

  state = { term: '', venues: [] };
  
  onChange = (e) => {
    this.setState({ term: e.target.value })
  }

  clearSearch = (e) => {
    this.setState({venues: []})
  }

  onSubmit = e => {
    e.preventDefault();
   
    const URL = `https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994,%2074.2179&near=New%20York,%20Ny&query=${this.state.term}&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm`;
 
    return axios.get(URL)
    .then(response => {
      console.log(response)
      if(response.data.response) {
        this.filterVenues(response.data.response.venues)
      }

    });
  }
   
   saveVenues(venues) {

    const places = [];
    this.state.venues.forEach(venue => {
      const record = {
        name: venue.name,
        address: venue.location.address,
        city: venue.location.city,
        url: venue.url
      };
      places.push(record);
   });
  
   axios.post('http://localhost:8080/savedSearches', 
     // JSON.stringify(places)
      {places: places}
    )
     .then(response => {
       console.log("the server has responded",response);
     });

   }


   filterVenues(venues) {
   
   let places = []
   
   let contegrityID = ["4d4b7104d754a06370d81259","4bf58dd8d48988d1e5931735","4bf58dd8d48988d1e7931735","4bf58dd8d48988d1e8931735","4bf58dd8d48988d1e9931735","5267e4d9e4b0ec79466e48d1","4bf58dd8d48988d18e941735","4bf58dd8d48988d1f2931735","4bf58dd8d48988d137941735","5032792091d4c4b30a586d5c","507c8c4091d498d9fc8c67a9","4bf58dd8d48988d136941735","4bf58dd8d48988d135941735","4bf58dd8d48988d11f941735",]
  
   venues.filter(function(venueItem) {
    

    venueItem.categories.forEach(function(category) {
    if (contegrityID.includes(category.id)) {
    
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

     const buttonStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 75,
      padding: 3,
      font: 12,
    };

      const button2Style = {
         marginTop: 10,
         
       };
       const savedStyle = {
        position: 'absolute',
        left: 0,
        top: 75,
        backgroundColor: 'blue',
        borderRadius: 5,
        width: 75,
        textAlign: 'center',
        padding: 5,
       }
  
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



      let warning = null 
      
     
      if (this.state.venues.length===0 && this.state.term.length>0) {
        warning = <div>no results</div>
        
      }
      console.log(warning)
      return (
        <div className="board" style={style}>
        
          <form className="js-search-form" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
           <br/><button style={button2Style} disabled={!isEnabled}>Search</button>
          
          </form>
          
         <div className={ 'overlay overlay-hugeinc ' + (venues.length > 0 ? 'open' : '') }>
               <button type="button" onClick={this.clearSearch} className={ "overlay-close" }>Close</button> 
               <button style={buttonStyle} type="button" onClick={this.saveVenues} className="button-save">save search</button>
               <Link  style={savedStyle} to="/saves">Go to saved searches</Link>
           <div className="js-search-results"> 
          { venues }
          { warning }



        </div>
      </div>
      </div>
    )

  }
}


export default connect(undefined, { search })(Board)


