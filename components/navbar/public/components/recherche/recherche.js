import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { searchCars } from '../../../../../api/cars';
import { useRouter } from 'next/router';
console.log(searchCars);
export const Recherche = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    const inputLength = value.trim().length;
  
    if (inputLength === 0) {
      return [];
    }
  
    const data = await searchCars(value.trim());
  
    return data;
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    router.push(`/selected/${suggestion.nom}`, { state: { produit: suggestion } });
  };

  const renderSuggestion = (suggestion) => (
    <div>{suggestion.nom}</div>
  );

  const inputProps = {
    placeholder: 'Recherche...',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.nom}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};
