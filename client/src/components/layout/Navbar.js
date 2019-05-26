import React, { Component } from 'react';
import '../layout/styles/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <ul className='nav justify-content-left fixed-top'>
          <li className='nav-item'>
            <span>Hungry || Indecisive ?</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
