import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowShow: false,
      navVisible: false,
      cartShow: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleShadowClick = this.handleShadowClick.bind(this);
  }

  handleHamburgerClick = (event) => {
    event.preventDefault();
    this.setState( { shadowShow: !this.state.navVisible }, () => {
      if (this.state.shadowShow) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    } );
    this.setState( { navVisible: !this.state.navVisible } );
    this.setState( { cartShow: false } );
  }

  handleCartClick = (event) => {
    event.preventDefault();
    this.setState( { shadowShow: !this.state.cartShow }, () => {
      if (this.state.shadowShow) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    } );
    this.setState( { cartShow: !this.state.cartShow } );
    this.setState( { navVisible: false } );
  }

  handleShadowClick = (event) => {
    event.preventDefault();
    this.setState({
      shadowShow: false,
      navVisible: false,
      cartShow: false
    });
    document.body.style.overflow = 'auto';
  }

  render() {
    const styles = require('./Header.scss');
    const logoImage = require('./img/cd-logo.svg');

    return (
      <div className={styles.header}>
        <nav className={'navbar navbar-default navbar-fixed-top' + ' ' + styles.customNav}>
          <div className={'container ' + styles.navContainer}>
            <Navbar.Header>
              <Navbar.Toggle className={styles.navbarToggle} onClick={this.handleHamburgerClick}/>
              <Navbar.Brand className={styles.brand}>
                <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                  <img src={logoImage} alt={config.app.title} />
                </IndexLink>
              </Navbar.Brand>
              <a href="#" className={styles.cartTrigger} onClick={this.handleCartClick}>
                <i className="fa fa-shopping-cart"/><span ref="cartTotal">(0)</span>
              </a>
            </Navbar.Header>

            <Navbar.Collapse refs="mainNav"
            className={this.state.navVisible ? (styles.mainNav + ' ' + styles.speedIn) : (styles.mainNav)}
            eventKey={0}>
              <Nav navbar>
                <LinkContainer to="/widgets">
                  <NavItem eventKey={2}>Widgets</NavItem>
                </LinkContainer>
                <LinkContainer to="/survey">
                  <NavItem eventKey={3}>Survey</NavItem>
                </LinkContainer>
                <LinkContainer to="/pagination">
                  <NavItem eventKey={4}>Pagination</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem eventKey={5}>About Us</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>

            <div ref="shadowLayer" className={this.state.shadowShow ? ( styles.cdShadowLayer + ' ' + styles.isVisible ) : ( styles.cdShadowLayer )}
            onClick={this.handleShadowClick}/>
            <div ref="cdCart"
            className={this.state.cartShow ? ( styles.cdCart + ' ' + styles.cartSpeedIn ) : ( styles.cdCart )}>
              <h2>Cart</h2>
              <ul className={styles.cdCartItems}>
                <li>
                  <span className={styles.cdQty}>1x</span> Product Name
                  <div className={styles.cdPrice}>$9.99</div>
                  <a href="#0" className={styles.cdItemRemove}>Remove</a>
                </li>
                <li>
                  <span className={styles.cdQty}>2x</span> Product Name
                  <div className={styles.cdPrice}>$19.98</div>
                  <a href="#0" className={styles.cdItemRemove}>Remove</a>
                </li>
                <li>
                  <span className={styles.cdQty}>1x</span> Product Name
                  <div className={styles.cdPrice}>$9.99</div>
                  <a href="#0" className={styles.cdItemRemove}>Remove</a>
                </li>
              </ul>
              {/* cd-cart-items */}
              <div className={styles.cdCartTotal}>
                <p>Total <span>$39.96</span></p>
              </div>
              {/* cd-cart-total */}
              <a href="#0" className={styles.checkoutBtn}>Checkout</a>
              <p className={styles.cdGoToCart}><a href="#0">Go to cart page</a></p>
            </div>
            {/* cd-cart */}
          </div>
        </nav>
      </div>
    );
  }
}
