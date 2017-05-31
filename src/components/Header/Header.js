import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

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
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

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
  };

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
  };

  handleShadowClick = (event) => {
    event.preventDefault();
    this.setState({
      shadowShow: false,
      navVisible: false,
      cartShow: false
    });
    document.body.style.overflow = 'auto';
  };

  handleLinkClick = (path) => {
    this.props.pushState(path);
    this.setState({
      shadowShow: false,
      navVisible: false,
      cartShow: false
    });
    document.body.style.overflow = 'auto';
  };

  render() {
    const {user} = this.props;
    const styles = require('./Header.scss');
    const logoImage = require('./img/cd-logo.svg');

    return (
      <div className={styles.header}>
        <nav className={'navbar navbar-default navbar-fixed-top' + ' ' + styles.customNav}>
          <div className={'container ' + styles.navContainer}>
            <Navbar.Header>
              <Navbar.Toggle className={styles.navbarToggle} onClick={this.handleHamburgerClick}/>
              <Navbar.Brand className={styles.brand}>
                <IndexLink to="/">
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
                <LinkContainer to="/">
                  <NavItem eventKey={1} onClick={() => this.handleLinkClick('/')}>
                    Home
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/widgets">
                  <NavItem eventKey={2} onClick={() => this.handleLinkClick('/widgets')}>Widgets</NavItem>
                </LinkContainer>
                <LinkContainer to="/survey">
                  <NavItem eventKey={3} onClick={() => this.handleLinkClick('/survey')}>Survey</NavItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <NavItem eventKey={4} onClick={() => this.handleLinkClick('/about')}>About Us</NavItem>
                </LinkContainer>
                {!user &&
                <LinkContainer to="/login">
                  <NavItem eventKey={5} onClick={() => this.handleLinkClick('/login')}>Login</NavItem>
                </LinkContainer>}
                {user &&
                <LinkContainer to="/logout">
                  <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
                    Logout
                  </NavItem>
                </LinkContainer>}
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

