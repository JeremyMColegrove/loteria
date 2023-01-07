import React, { useEffect, useState } from 'react';
import EmptyCard from './img/emptyCard.png'

function Card({ src }) {
  // State to store the current image src
  const [currentSrc, setCurrentSrc] = useState(src);
  // State to store whether the card is being flipped or not
  const [isFlipping, setIsFlipping] = useState(false);

  // Function to handle the image src change
  function handleSrcChange() {
    setIsFlipping(true);
    setTimeout(() => {
      setTimeout(()=>{
        setCurrentSrc(src);
      }, 100);
      setIsFlipping(false);
    }, 750);

    setTimeout(()=>{
        setCurrentSrc(EmptyCard)
    }, 100)
  }

  useEffect(()=>{
    handleSrcChange();
  }, [src])

  return (
    <div className={"card " + (isFlipping ? 'flipping' : '')}>
      <img src={currentSrc} alt="slideshow"/>
    </div>
  );
}

export default Card;
