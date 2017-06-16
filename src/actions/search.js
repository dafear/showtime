const URL = "https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994, 74.2179&near=New York, Ny&query=music&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm"
export function search(term){
	return async (dispatch) => {
		dispatch({type:'SEARCH'})
		try { 
       const res = await fetch(`${URL}&query=${term}`)
       const resJson = await res.json()
       console.log(resJson)
		} catch (e) {
			console.log({ e })
			throw e 
		}
	}

}