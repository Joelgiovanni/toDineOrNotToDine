import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
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
        // const restaurant = {
        //   name: res.data.nearby_restaurants[0].restaurant.name,
        //   style: res.data.nearby_restaurants[0].restaurant.cuisines,
        //   rating:
        //     res.data.nearby_restaurants[0].restaurant.user_rating
        //       .aggregate_rating,
        //   ratingColor:
        //     res.data.nearby_restaurants[0].restaurant.user_rating.rating_color
        // };
        var restaurants = res.data.nearby_restaurants;

        restaurants.forEach(function(restaurant) {
          const filteredResults = {
            name: restaurant.restaurant.name,
            style: restaurant.restaurant.cuisines,
            rating: restaurant.restaurant.user_rating.aggregate_rating,
            ratingColor: restaurant.restaurant.user_rating.rating_color
          };
          console.log(filteredResults);
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h3>App</h3>
      </div>
    );
  }
}

export default Main;
