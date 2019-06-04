import React, { Component } from 'react';
import './Banner.css';

class Banner extends Component {
  render() {
    return (
      <div>
        <div className='parallax ' />
        <span className='app-name'>
          What's Cooking Tonight ? <i className='fas fa-utensils' />
        </span>
      </div>
    );
  }
}

export default Banner;
