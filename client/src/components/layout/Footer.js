import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className='container-fluid container-fluid-footer'>
        <div className='footer'>
          <div className='footer-content'>
            <span className='copyright'> &#169; </span>
            Joel Godoy {new Date().getFullYear()}
            <a
              className='fab fa-github icon'
              href='https://github.com/Joelgiovanni'
              target='_blank'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
