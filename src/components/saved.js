import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ToggleDisplay from 'react-toggle-display';
import './saved.css';
// import './board.css';


 export default class Saved extends React.Component {

	constructor(props) {
		super(props);
		this.state={results: [], show: false};
	}
	 componentDidMount() {
    // console.log('whatever');
    let email = localStorage.getItem('email');
      return axios.get('https://showtime-api.herokuapp.com/searches?email=' + email)
      .then(response => {
      	console.log(response);
      	this.setState({results: response.data});
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



 handleClick() {
    this.setState({
      show: !this.state.show
    });
  }




    render() {

    	 const style = {
      textAlign: 'center',
    
    };

     const buttonStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#99c5ff',
      borderRadius: 3,
      width: 72,
      textAlign: 'center',
      padding: 5,
      color: 'white',
      margin: 5,
      fontSize: 14,

     
    };

        const savedStyle2 = {

                      position: 'absolute',
                      top: 10,            
                          right: 0,
                          backgroundColor: '#99c5ff',
                          borderRadius: 5,
                          width: '98px',
                          textAlign: 'center',
                          padding: 5,
                      margin: 5,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 400,

                    };



      const savedStyle3 = {
  
                      top: 10,            
                          right: 0,
                          backgroundColor: '#99c5ff',
                          borderRadius: 5,
                          width: '98px',
                          textAlign: 'center',
                          padding: 5,
                      margin: 5,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 400,

                    };


    	
      let venues = [];
       this.state.results.forEach((result, i) => {
    let places = result.results.map((venue, j) => {
    return (

       <li className='venueItem' key={j}>
        <a rel="noreferrer noopener" target='_blank' href={venue.url}>{venue.name}</a>
        <p>{venue.name}</p>
        <p>{venue.address}</p>
        <p>{venue.city}</p>
      </li>
    )
  });

  venues.push(
    <li  key={i}>
      <h3>Term: "{result.term}"</h3>
      <p> {result.searchedAt} </p>
      <ul style={{ listStyleType: 'none' }}>{places}</ul>
    </li>
  )
});

       
		return (
         <div style={style} className="saved">
          <button style={savedStyle2} onClick={ () => this.handleClick() }>show searches</button>
          <Link  style={buttonStyle} to="/myboard">Go back to searches</Link>
          <ToggleDisplay show={this.state.show}>
          <button style={savedStyle3} onClick={ () => this.handleClick() }>remove searches</button>
		       {venues}
          </ToggleDisplay>
       </div>   
     );
	}	
}