import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import Link from 'next/link';
import { searchCars } from '@/api/cars';
import './public/sass/recherche.module.scss';
import { CarRecherche } from './public/components/carRecherche/carRecherche';
 import { useRouter } from 'next/router';
export const Recherche = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    if (!value) {
      return [];
    }

    const inputValue = value.trim().toLowerCase();

    if (inputValue.length === 0) {
      return [];
    }

    const results = await searchCars(inputValue);
    return results;
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const newSuggestions = await getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };
  const onSuggestionSelected = (event, { suggestion }) => {
    setValue('');
  };
  const renderSuggestion = (suggestion) => (
    <Link href={`/${suggestion.id}`}>
        {suggestion.image && (
          <img src={suggestion.image} alt={suggestion.nom} className="suggestion-image" />
        )}
        <span>{suggestion.nom}</span>
    </Link>
  );

  const inputProps = {
    placeholder: 'Recherche...',
    value: value || '',
    onChange,
    
  };

  return (
    <div className='recherche'>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.nom}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};