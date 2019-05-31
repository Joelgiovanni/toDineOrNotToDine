import React, { Component } from 'react';
import axios from 'axios';
const keys = require('./../config/Keys');

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
    const ipifyKey = keys.ipifyKey;
    const userKey = keys.userKey;

    // Every this.setSate has a call back since the data is required for the next API call
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.setState(
        {
          ip: res.data.ip
        },
        () => {
          // GET the coordinates of a location based on IP adress
          console.log(this.state);
          axios
            .get(
              'https://geo.ipify.org/api/v1?apiKey=' +
                ipifyKey +
                '&ipAddress=' +
                this.state.ip
            )
            .then(res => {
              this.setState(
                {
                  latitude: res.data.location.lat,
                  longitude: res.data.location.lng
                },
                () => {
                  const currentLocation =
                    'https://developers.zomato.com/api/v2.1/geocode?lat=' +
                    this.state.latitude +
                    '&lon=' +
                    this.state.longitude;
                  // Make the API call on page load
                  console.log(this.state);
                  axios({
                    method: 'get',
                    url: currentLocation,
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      Accept: 'application/json',
                      'user-key': userKey
                    }
                  })
                    .then(res => {
                      const restaurantsNearMe = res.data.nearby_restaurants;

                      this.setState({
                        restaurants: restaurantsNearMe
                      });

                      // Pick out a random retaurant from what the API returns
                      var randomRestaurant =
                        restaurantsNearMe[
                          Math.floor(Math.random() * restaurantsNearMe.length)
                        ];

                      // Select only the data that you want
                      var finalResult = {
                        name: randomRestaurant.restaurant.name,
                        id: randomRestaurant.restaurant.id,
                        rating:
                          randomRestaurant.restaurant.user_rating
                            .aggregate_rating,
                        ratingColor:
                          randomRestaurant.restaurant.user_rating.rating_color,
                        address: randomRestaurant.restaurant.location.address,
                        delivery: randomRestaurant.restaurant.is_delivering_now,
                        typeOfFood: randomRestaurant.restaurant.cuisines
                      };

                      this.setState({
                        restaurant: finalResult
                      });
                    })
                    .catch(err => console.log(err));
                }
              );
            })
            .catch(err => console.log(err));
        }
      );
    });
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
