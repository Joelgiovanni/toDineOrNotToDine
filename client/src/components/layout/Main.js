import React, { Component } from 'react';
import './MainContent.css';
import axios from 'axios';
const keys = require('../../config/Keys');

class MainContent extends Component {
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
      <div className='container mt-4 content'>
        <div className='row'>
          <div className='col'>
            <h1 className='header'>Our Mission</h1>
            <p className='mt-4 supporting'>
              Our end goal is to stop the back and forth arguements about where
              to eat.{' '}
              <span style={{ color: 'red' }}>
                I know everyone knows exactly what we are talking about.
              </span>
              Our system will find a nearby restaurant at random and display it
              for you with a rating, address and the type of food !
            </p>
          </div>
          <div className='col'>
            <h1 className='header'>Try us out!</h1>

            <p className='mt-4'>
              Make your life a little easier. <br />
              Unless you like having the same arguement every single day?
            </p>

            <div className='mt-4'>
              <button
                type='button'
                className='btn btn-outline-secondary btn-lg'
                data-toggle='modal'
                data-target='#exampleModalCenter'
              >
                Find Food
                <i className='fas fa-search ml-2' />
              </button>
              <div className='col arrows'>
                <i className='fas fa-arrow-up' />
                <i className='fas fa-arrow-up' />
                <i className='fas fa-arrow-up' />
                <i className='fas fa-arrow-up' />
              </div>
              <div
                className='modal fade'
                id='exampleModalCenter'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalCenterTitle'
                aria-hidden='true'
              >
                <div
                  className='modal-dialog modal-dialog-centered'
                  role='document'
                >
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='exampleModalLongTitle'>
                        <span>Restaurant: </span>
                        {this.state.restaurant.name}
                      </h5>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <div class='container'>
                        <div class='row'>
                          <div class='col'>
                            <h4>Rating</h4>
                            <span>{this.state.restaurant.rating}/5</span>
                          </div>
                          <div class='col'>
                            <h4>Address</h4>
                            <span>{this.state.restaurant.address}</span>
                          </div>
                          <div class='col'>
                            <h4>Delivery</h4>
                            <span>
                              {this.state.restaurant.delivery === 0
                                ? 'Yes'
                                : 'No'}
                            </span>
                          </div>
                          <div class='col'>
                            <h4>Style</h4>
                            {this.state.restaurant.typeOfFood}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-dismiss='modal'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MainContent;
