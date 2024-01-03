import React, { useState } from 'react';
import './List.css';
import character from '../data/character';

const Liste = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(character[0]);

  const handleChange = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div id="scene">
      <div id="left-zone">
        <ul className="list">
          {character.map((character) => (
            <li key={character.id} className="item">
              <input
                type="radio"
                id={`radio_${character.name}`}
                name="basic_carousel"
                value={character.name}
                checked={selectedCharacter === character}
                onChange={() => handleChange(character)}
              />
              <label htmlFor={`radio_${character.name}`} className={`label_${character.name}`}>
                {character.name}
              </label>
              <div className={`content content_${character.name}`}>
                <span className="picto" style={{ backgroundImage: `url(${character.images})` }}></span>
                  <h1>{character.nameFilm}</h1>
                  <p>{character.description}</p>
                
                
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id="middle-border"></div>
      <div id="right-zone"></div>
    </div>
  );
};

export default Liste;
