import React, { useState, useEffect, useRef } from 'react';
import SettingsMenu from './settingsMenu';
import ImageGrid from './imageGrid';

import Alacran from './img/alacran.jpg'
import Arana from './img/arana.jpg'
import Arpa from './img/arpa.jpg'
import Bandera from './img/bandera.jpg'
import Borracho from './img/borracho.jpg'
import Calavera from './img/calavera.jpg'
import Cameron from './img/camaron.jpg'
import Campana from './img/campana.jpg'
import Cantarito from './img/cantarito.jpg'
import Cazo from './img/cazo.jpg'
import Corazon from './img/corazon.jpg'
import Corona from './img/corona.jpg'
import Cotorro from './img/cotorro.jpeg'
import Dama from './img/dama.jpg'
import Estrella from './img/estrella.jpg'
import Garza from './img/garza.jpeg'
import Gorrito from './img/gorrito.jpg'
import Jaras from './img/jaras.jpg'
import Luna from './img/luna.jpg'
import Maceta from './img/maceta.jpg'
import Melon from './img/melon.jpg'
import Muerte from './img/muerte.jpg'
import Mundo from './img/mundo.jpg'
import Nopal from './img/nopal.jpeg'
import Pajaro from './img/pajaro.jpg'
import Palma from './img/palma.jpg'
import Pera from './img/pera.jpg'
import Pescado from './img/pescado.jpg'
import Pino from './img/pino.jpg'
import Rana from './img/rana.jpg'
import Sandia from './img/sandia.jpg'
import Soldado from './img/soldado.jpg'
import Venado from './img/venado.jpg'

import GameOver from './img/emptyCard.png'
import Card from './card';
import ImagePopup from './imagePopup';

const startingTimerLength = 2000

function ImageSlideshow() {
  // State to store the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to store the images array
  const [images, setImages] = useState([Alacran, Arana, Arpa, Bandera, Borracho, Calavera, Cameron, Campana, Cantarito, Cazo, Corazon, Corona, Cotorro, Dama, Estrella, Garza, Gorrito, Jaras, Luna, Maceta, Melon, Muerte, Mundo, Nopal, Pajaro, Palma, Pera, Pescado, Pino, Rana, Sandia, Soldado, Venado]);
  // State to store whether the slideshow is paused or not
  const [isPaused, setIsPaused] = useState(true);
  // State to store the time left for the current image
  const [timeLeft, setTimeLeft] = useState(startingTimerLength);
  // State to store a boolean value indicating whether all the images have been shown or not
  const [allImagesShown, setAllImagesShown] = useState(false);
  // State to store how long each image should be shown for
  const [velocity, setVelocity] = useState(startingTimerLength)
  // State to store the previously shown images
  const [previousImages, setPreviousImages] = useState([]);
  // State to store the image grids or slideshow
  const [displayMode, setDisplayMode] = useState('slideshow');

  const messagesEndRef = useRef(null)

  // Use effect hook to shuffle the images array when the component mounts
  useEffect(() => {
    shuffleCards()
  }, []);


// Use effect hook to change the current image index after a certain period of time
useEffect(() => {
  if (!isPaused && !allImagesShown) {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 10);
      if (timeLeft <= 0) {
        setPreviousImages([...previousImages, images[currentIndex]]);
        setCurrentIndex(currentIndex=>(currentIndex + 1));
        setTimeLeft(velocity);
      }
      if (currentIndex === images.length) {
        setAllImagesShown(true);
      }
    }, 10);
    return () => clearInterval(interval);
  }
}, [currentIndex, velocity, isPaused, timeLeft, images.length, previousImages, allImagesShown]);

function shuffleCards() {
  setImages(shuffleArray(images));
}

  // Function to shuffle the images array
  function shuffleArray(array) {
    // Implement shuffle logic here
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to handle the pause/play button click
  function handlePauseClick() {
    setIsPaused(!isPaused);
  }

  function resetGame() {
    shuffleCards()
    setPreviousImages([])
    setAllImagesShown(false)
    setCurrentIndex(0)
    setIsPaused(true)
  }

  function handleVelocityChange(newVelocity) {
    setVelocity(newVelocity)
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [previousImages]);

  // Function to handle the image click
  function handleImageClick(image) {
    // setRevealedCard(image);
  }

  return (
    <div className="game-container">
      <div className="carousel">
        {previousImages.length == 0 && <p>Previous Images shown Here</p>}
        {previousImages.map((image, index)=>{
          return <img className="carousel-image" key={index} src={image}/>
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="card-container">
        {displayMode === 'slideshow' ? (
            <Card src={!allImagesShown?images[currentIndex]:GameOver}/>
        ) : (
            <ImageGrid images={images}/>
        )}
      </div>


      

      <div className="controls">
        {/*  Display the progress bar */}
        <div className="card-progress-container">
          {!allImagesShown && <div className="card-progress" style={{ width: `${((velocity-timeLeft) / velocity) * 100}%`}} />}
        </div>
        <div className="control-buttons-container">
          {/* Display the pause/play button */}
          {!allImagesShown && <button className="pause-play" onClick={handlePauseClick}>
            {isPaused ? 'Play' : 'Pause'}
          </button>}
          {allImagesShown && <button className='pause-play' onClick={resetGame}>
            Restart Game
          </button>
          }
          <SettingsMenu velocity={velocity} handleVelocityChange={handleVelocityChange}/>
          <ImagePopup images={images} previousImages={previousImages}/>
            {/* Toggle button */}
          <button className="settings-open" onClick={() => setDisplayMode(displayMode === 'slideshow' ? 'grid' : 'slideshow')}>
            Toggle Mode
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default ImageSlideshow;
