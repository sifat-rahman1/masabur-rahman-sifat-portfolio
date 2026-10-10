import React from 'react';
import './MaskedHeading.css';

export default function MaskedHeading({
  text = "LET'S BUILD",
  bgImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
  className = ""
}) {
  return (
    <h1
      className={`masked-heading ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
      data-text={text}
    >
      {text}
    </h1>
  );
}
