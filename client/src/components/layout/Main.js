import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: ''
    };
  }

  componentDidMount() {
    // Make the API call on page load
    axios
      .get(
        'https://developers.zomato.com/api/v2.1/geocode?lat=39.7692802&lon=-105.0640723',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'user-key': '1062f6965a8e3100b4d2f44709cb9bc4'
          }
        }
      )
      .then(res => {
        const restaurantsNearMe = res.data.nearby_restaurants;

        this.setState({ restaurants: restaurantsNearMe });

        var random = this.state.restaurants[
          Math.floor(Math.random() * this.state.restaurants.length)
        ];

        console.log(random);

        // Filter out only the data that we want before saving into state
        // restaurantsNearMe.forEach(restaurant => {
        //   const filteredResults = {
        //     name: restaurant.restaurant.name,
        //     id: restaurant.restaurant.id,
        //     rating: restaurant.restaurant.user_rating.aggregate_rating,
        //     ratingColor: restaurant.restaurant.user_rating.rating_color,
        //     address: restaurant.restaurant.location.address,
        //     delivery: restaurant.restaurant.is_delivering_now
        //   };

        // Save filtered data into state
        //   this.setState({ restaurants: filteredResults });

        //   console.log(this.state.restaurants);
        // });
      })
      .catch(err => console.log(err));
  }
  render() {
    return <div>||</div>;
  }
}

export default Main;
