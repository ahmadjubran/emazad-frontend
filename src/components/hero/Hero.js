import React from 'react';
import imgAction from '../../assets/logo.png';
import './hero.css';
function Hero() {
  return (
    <div className='landing'>
      <div className='container'>
        <div className='text'>
          <h1>Welcome,To eMazad </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum minima eveniet, nostrum labore nihil natus cupiditate consectetur itaque dolore modi iste, laudantium corporis. Repudiandae cum dolorum reprehenderit perspiciatis modi!</p>
          <button className='btn'>Get Started</button>
        </div>
        <div className='image'>
          <img src={imgAction} alt='landing pctuer' />
        </div>
      </div>
    </div>
  )
}

export default Hero;
