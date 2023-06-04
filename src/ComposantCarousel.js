import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export function ComposantCarousel() {
    return (
      <div>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/6fca8776b1f847c6.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/9406be4ce25d4879.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/63903f3765294921.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
    )
}