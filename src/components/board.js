import React from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/search';
import { Link } from 'react-router-dom';
import './board.css';
import './demo.css';
// import Background from '../images/bluelight.png';
import axios from 'axios';





    class Board extends React.Component {
      constructor(props) {
       super(props);
       this.saveVenues = this.saveVenues.bind(this);
       this.state = { term: '', venues: [], warning: '' };
    }




        onChange = (e) => {
          this.setState({ term: e.target.value, warning: '' })
              
        }




        clearSearch = (e) => {
          this.setState({venues: []})
     
        }





        onSubmit = e => {
          e.preventDefault();

          const URL = `https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994,%2074.2179&near=New%20York,%20Ny&query=${this.state.term}&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm`;

          return axios.get(URL)

          .then(response => {

            if(response.data.response) {

              const venues = response.data.response.venues;
              this.filterVenues(venues);
            }

          });

        }


        saveVenues(venues) {
          console.log('apiToken');
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

           let userEmail = localStorage.getItem('email');
              axios.post('https://showtime-api.herokuapp.com/savedSearches', 

                {places: places, term: this.state.term, userEmail: userEmail}

            )

          .then(response => {  

            localStorage.setItem('term', this.state.term); 
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

             console.log('venues', places);

             if (places.length===0 && this.state.term.length > 0) {
              this.setState({warning: "No results"});

           } 

            this.setState({venues: places}) 

        }


        canBeSubmitted() {
          const { term } = this.state;
          return (
            term.length > 0 
            );

         }


            logOut () {
                localStorage.removeItem('apiToken');
                  localStorage.removeItem('email');
                   localStorage.removeItem('term');
                 window.location.href = "/signin"

                }


        componentDidMount() {

           let email = localStorage.getItem('email');
              return axios.get('https://showtime-api.herokuapp.com/searches?email=' + email)
              .then(response => {
                if (response.data.length) {
                  let last = response.data[response.data.length];
                  this.setState({ lastSearched: last });
                  }
              
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
                width: 75,
                padding: 3,
                fontSize: 14,
            borderRadius: 5,
            margin: 5,
            
        }



                const button2Style = {
                   marginTop: 10,
                 
                }




                const savedStyle = {
                  position: 'absolute',
                  left: 0,
                  top: 75,
                      margin: 5,
                      backgroundColor: '#99c5ff',
                      borderRadius: 3,
                      width: 72,
                      textAlign: 'center',
                  padding: 5,
                  font: 8,
                  color: 'white',
                   zIndex: 2,
                }



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

                    }


                      // const savedStyle4 = {
                        
                      //    backgroundImage: "url(" + Background + ")",
                      //     backgroundRepeat: 'noRepeat',
                      //     backgroundSize: 'cover',
                      //         // position: 'absolute', 
                      //        top: 0, 
                      //        left: 0, 
                      //       right: 0, 
                      //       bottom: 0, 
                      //        margin: 'auto', 
                      //       minWidth: 50,
                      //        minHeight: 50,
                      //        heigth: 150,
                      //       zIndex: 1,
                      //       padding: 5,
                             
                      //     }
                         


                   



            let venues = [];

            this.state.venues.forEach((venue, i,) => {

              venues.push( 
                <li className='venueItem' key={i}>
                <a rel="noreferrer noopener" target='_blank' href={venue.url}>{ venue.name}</a>
                <p> { venue.name } </p>
                <p> { venue.location.address } </p>
                <p> { venue.location.city } </p>

                </li>);  

            });

        const isEnabled = this.canBeSubmitted(); 

        console.log(this.state.warning);


      let term = localStorage.getItem('term');
          let message = `still interested in...${term}`;
          let str = <h3>you haven't searched yet</h3>;
      if (term) {
        str = <h3> {message} </h3>
      }


    return (

    <div className="board" style={style}>

     <form className="js-search-form" onSubmit={this.onSubmit}>

       <h1>SHOWTIME</h1>

        <h2> Search for venues (e.g. music, comedy, theater) play around with related terms and get more results</h2>

         <h3 style={buttonStyle}> Welcome Back {localStorage.getItem('email')}</h3>
                {str}

          <input value={this.state.term} onChange={this.onChange} />

        <br/><button style={button2Style} disabled={!isEnabled}>Search</button>

      <button  onClick={this.logOut} style={savedStyle2}>Log Out</button>


     </form>

          <p>{ this.state.warning }</p>

     <div className={ 'overlay overlay-hugeinc ' + (venues.length > 0 ? 'open' : '') }>

           <button type="button" onClick={this.clearSearch} className={ "overlay-close" }>Close</button> 

        <button style={buttonStyle} type="button" onClick={this.saveVenues} className="button-save">save search</button>

       <Link  style={savedStyle} to="/saves">Go to saved searches</Link>

    <div className="js-search-results"> 

         { venues }

        </div>
      </div>
    </div>
    )

  }
}


export default connect(undefined, { search })(Board)


