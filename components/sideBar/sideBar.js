import React, { useState } from 'react';
import styles from './public/sass/sideBar.module.scss';

export const SideBar = ({ colors, selectedColors, onColorSelect }) => {
    const [allSelected, setAllSelected] = useState(true);
    const [showAllColors, setShowAllColors] = useState(false);
    const [displayedColors, setDisplayedColors] = useState(colors.slice(0, 5));

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

    return (
        <div className={styles.sideBar}>
            <h3>Filter by color</h3>
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
        </div>
    );
};