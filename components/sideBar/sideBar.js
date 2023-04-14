import React, { useState } from 'react'; 
import styles from './public/sass/sideBar.module.scss'; 
import { Range } from 'react-range'; 

export const SideBar = ({ colors, selectedColors, onColorSelect, onPriceRangeChange, maxPrice, onYearRangeChange, maxYear, onClose }) => {
    const [allSelected, setAllSelected] = useState(true);
    const [showAllColors, setShowAllColors] = useState(false); 
    const [displayedColors, setDisplayedColors] = useState(colors.slice(0, 5)); 
    const [priceRange, setPriceRange] = useState([0, maxPrice]); 
    const [yearRange, setYearRange] = useState([1900, maxYear]); 
  
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
                <button className={styles.closeButton} onClick={onClose}> &times;
                </button>
                <h3>Couleur</h3>
                <ul className={styles.colorList}>
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
                {colors.length > 5 && (
                    <button className={styles.seeMore} onClick={handleSeeMoreClick}>
                        {showAllColors ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
                <h3>Prix</h3>
                <div className={styles.priceRange}>
  <Range
    step={100}
    min={0}
    max={maxPrice}
    values={priceRange}
    onChange={(values) => handlePriceRangeChange(values)}
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
  <div className={styles.yearRangeLabels}>
    <span>{yearRange[0]}</span>
    <span>{yearRange[1]}</span>
  </div>
</div>
    </div>
            </div>
    );
    };