import React, { useState } from 'react'; // Importation de React et de useState
import styles from './public/sass/sideBar.module.scss'; // Importation des styles CSS pour styliser la barre latérale
import { Range } from 'react-range'; // Importation du composant Range de la bibliothèque React-Range

export const SideBar = ({ colors, selectedColors, onColorSelect, onPriceRangeChange, maxPrice, onYearRangeChange, maxYear, onClose }) => {
    const [allSelected, setAllSelected] = useState(true); // État local pour déterminer si toutes les couleurs sont sélectionnées
    const [showAllColors, setShowAllColors] = useState(false); // État local pour afficher ou masquer toutes les couleurs disponibles
    const [displayedColors, setDisplayedColors] = useState(colors.slice(0, 5)); // État local pour stocker les couleurs à afficher
    const [priceRange, setPriceRange] = useState([0, maxPrice]); // État local pour stocker la plage de prix sélectionnée
    const [yearRange, setYearRange] = useState([1900, maxYear]); // État local pour stocker la plage d'années sélectionnée
  
    function handleColorClick(color) {
      if (color === 'all') {
        setAllSelected(true);
      } else {
        setAllSelected(false);
      }
      onColorSelect(color);
    }
  
    function handleSeeMoreClick() {
      setShowAllColors(!showAllColors);
      setDisplayedColors(showAllColors ? colors.slice(0, 5) : colors);
    }
  
    function handlePriceRangeChange(newPriceRange) {
      setPriceRange(newPriceRange);
      onPriceRangeChange(newPriceRange);
    }
  
    function handleYearRangeChange(newYearRange) {
      setYearRange(newYearRange);
      onYearRangeChange(newYearRange);
    }
  
    return (
        <div className={styles.sideBar}>
            <div className={styles.containerSideBar}>
                {/* Bouton pour fermer la barre latérale */}
                <button className={styles.closeButton} onClick={onClose}> &times;
                </button>
                {/* Liste des couleurs */}
                <h3>Couleur</h3>
                <ul className={styles.colorList}>
                    {/* Case à cocher pour sélectionner toutes les couleurs */}
                    <li className={styles.colorListItem}>
                        <label>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={() => handleColorClick('all')}
                            />
                            All Colors
                        </label>
                    </li>
                    {/* Liste des couleurs sélectionnables */}
                    {displayedColors.map((color) => (
                        <li key={color} className={styles.colorListItem}>
                            <label>
                                <input
                                type="checkbox"
                                checked={selectedColors.includes(color)}
                                onChange={() => handleColorClick(color)}
                                />
                                {color}
                            </label>
                        </li>
                    ))}
                </ul>
                {/* Bouton pour afficher ou masquer toutes les couleurs disponibles */}
                {colors.length > 5 && (
                    <button className={styles.seeMore} onClick={handleSeeMoreClick}>
                        {showAllColors ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
                {/* Sélecteur de plage de prix */}
                <h3>Prix</h3>
                <div className={styles.priceRange}>
  <Range
    step={100}
    min={0}
    max={maxPrice}
    values={priceRange}
    onChange={(values) => handlePriceRangeChange(values)}
    // Affichage de la barre de progression avec une couleur de fond grise
    renderTrack={({ props, children }) => (
      <div
        {...props}
        style={{
          ...props.style,
          height: '6px',
          width: '100%',
          backgroundColor: '#ccc',
        }}
      >
        {children}
      </div>
    )}
    // Affichage du bouton de contrôle du curseur avec une couleur de fond bleue
    renderThumb={({ props }) => (
      <div
        {...props}
        style={{
          ...props.style,
          height: '16px',
          width: '16px',
          backgroundColor: '#3366ff',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    )}
  />
  {/* Affichage des labels pour les valeurs min et max du curseur */}
  <div className={styles.priceRangeLabels}>
    <span>{priceRange[0]} €</span>
    <span>{priceRange[1]} €</span>
  </div>
</div>
<h3>Année</h3>
<div className={styles.yearRange}>
  <Range
    step={1}
    min={1900}
    max={maxYear}
    values={yearRange}
    onChange={(values) => handleYearRangeChange(values)}
    // Affichage de la barre de progression avec une couleur de fond grise
    renderTrack={({ props, children }) => (
      <div
        {...props}
        style={{
          ...props.style,
          height: '6px',
          width: '100%',
          backgroundColor: '#ccc',
        }}
      >
        {children}
      </div>
    )}
    // Affichage du bouton de contrôle du curseur avec une couleur de fond bleue
    renderThumb={({ props }) => (
      <div
        {...props}
        style={{
          ...props.style,
          height: '16px',
          width: '16px',
          backgroundColor: '#3366ff',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    )}
  />
  {/* Affichage des labels pour les valeurs min et max du curseur */}
  <div className={styles.yearRangeLabels}>
    <span>{yearRange[0]}</span>
    <span>{yearRange[1]}</span>
  </div>
</div>
    </div>
            </div>
    );
    };