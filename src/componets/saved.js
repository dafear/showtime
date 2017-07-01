import React from 'react';
import axios from 'axios';
import './board.css';

export default class Saved extends React.Component {

	constructor(props) {
		super(props);
		this.state={results: []};
	}
	 componentDidMount() {
      return axios.get('http://localhost:8080/searches')
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



    render() {

    	 const style = {
      textAlign: 'center',
    
    };
    	
        let venues = [];
       this.state.results.forEach((venue, i,) => {
      venues.push( 
        <li key={i}>
           <a target='_blank' href={venue.url}>{ venue.name}</a>
           <p> {venue.name} </p>
            <p> { venue.address } </p>
           <p> { venue.city } </p>




            </li>);

     });         
           
       
		return (

		<div style={style} className="saved">
		  {venues}   
		    </div>
     );
	}

	
};