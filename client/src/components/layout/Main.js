import React, { Component } from 'react';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: '',
      location: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log('getCurrentPosition Success ' + lat + lng); // logs position correctly
        this.setState({
          location: {
            lat: lat,
            lng: lng
          }
        });
      },
      error => {
        this.props.displayError('Error dectecting your location');
        console.error(JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Make the API call on page load
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/geocode?lat=39.6924553&lon=-105.0256318`,
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
        console.log(this.state.location);
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

export default Main;
