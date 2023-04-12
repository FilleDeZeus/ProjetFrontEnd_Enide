import { useState } from 'react';
import Link from 'next/link';
import { searchCars } from '@/api/cars';
import styles from './public/sass/recherche.module.scss';
import { CarRecherche } from './public/components/carRecherche/carRecherche';

export const Recherche = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    setValue(inputValue);
    const newSuggestions = await getSuggestions(inputValue);
    setSuggestions(newSuggestions);
  };

  const getSuggestions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }
    const results = await searchCars(inputValue);
    return results;
  };

  const handleSuggestionClick = () => {
    setValue('');
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => (
    <Link href={`/${suggestion.id}`}>
      <CarRecherche car={suggestion} />
    </Link>
  );

  return (
    <div className={styles.recherche}>
      <input
        type="text"
        placeholder="Recherche..."
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />
      <div className={styles.suggestionContainer}>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            onClick={handleSuggestionClick}
            className={styles.suggestion}
          >
            {renderSuggestion(suggestion)}
          </div>
        ))}
      </div>
    </div>
  );
};