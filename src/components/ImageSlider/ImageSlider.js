import React, { Component, PropTypes } from 'react';
const Carousel = require('react-responsive-carousel').Carousel;

export default class ImageSlider extends Component {
  render() {
    const { items } = this.props;

    return (
      <Carousel
      dynamicHeight emulateTouch>
        {items && items.length &&
              items.map((item, key) =>
                <div key={key}>
                  <img src={require('./img/slide1.jpeg')}/>
                  <p className="legend">{item.text}</p>
                </div>
              )
            }
      </Carousel>
    );
  }
}

ImageSlider.propTypes = {
  items: PropTypes.array
};

