import React, { Component } from 'react';
import axios from 'axios';

/// HIDE ALL OF YOUR API KEYS BEFORE NEXT COMMIT

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: '',
      ip: '',
      latitude: '',
      longitude: ''
    };
  }

  componentDidMount() {
    // Get the IP adress of user
    axios
      .get('https://api.ipify.org?format=json')
      .then(res => {
        this.setState({ ip: res.data.ip });
        console.log(`IP : ${this.state.ip}`);
      })
      .catch(err => console.log(err));

    // GET the coordinates of a location based on IP adress
    axios
      .get(
        'https://geo.ipify.org/api/v1?apiKey=at_yvYrNjg6jYGxosCwyldQLhWEEZ9Rz&ipAddress=24.8.227.87'
      )
      .then(res => {
        this.setState({
          latitude: res.data.location.lat,
          longitude: res.data.location.lng
        });
        console.log(
          `Latitude: ${this.state.latitude}. Longitude: ${this.state.longitude}`
        );
      })
      .catch(err => console.log(err));

    // Make the API call on page load
    axios({
      method: 'get',
      url: `https://developers.zomato.com/api/v2.1/geocode?lat=39.6924553&lon=-105.0256318`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'user-key': '1062f6965a8e3100b4d2f44709cb9bc4'
      }
    })
      .then(res => {
        const restaurantsNearMe = res.data.nearby_restaurants;

        this.setState({ restaurants: restaurantsNearMe });

        // Pick out a random retaurant from what the API returns
        var randomRestaurant =
          restaurantsNearMe[
            Math.floor(Math.random() * restaurantsNearMe.length)
          ];

        // Select only the data that you want
        var finalResult = {
          name: randomRestaurant.restaurant.name,
          id: randomRestaurant.restaurant.id,
          rating: randomRestaurant.restaurant.user_rating.aggregate_rating,
          ratingColor: randomRestaurant.restaurant.user_rating.rating_color,
          address: randomRestaurant.restaurant.location.address,
          delivery: randomRestaurant.restaurant.is_delivering_now,
          typeOfFood: randomRestaurant.restaurant.cuisines
        };

        this.setState({ restaurant: finalResult });
        console.log(this.state.restaurant);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>Restaurant:{this.state.restaurant.name}</h1>
        <p>Rating: {this.state.restaurant.rating}</p>
        <p>Address: {this.state.restaurant.address}</p>
        <p>
          Delivery:{' '}
          {this.state.restaurant.delivery === 0 ? (
            <span> This location does not deliver </span>
          ) : (
            <span> This location offers delivery </span>
          )}
        </p>
        <p>Style: {this.state.restaurant.typeOfFood}</p>
      </div>
    );
  }
}

export default Test;
