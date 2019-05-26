import React, { Component } from 'react';
import './styles/Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className='container-fluid landing'>
        <div className='row'>
          <div className='col-6 supporting-content'>
            <h1>Let us take care of your dinner plans</h1>
            <p>
              With a click of a button we will find a local top rated dinner for
              you to eat!
            </p>
            <p>No more back and forth arguements!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
