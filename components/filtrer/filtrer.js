import { useEffect, useState } from 'react';
import { searchCars } from '@/api/cars.js';

export const CarFilter = () => {
  const [models, setModels] = useState([]); // State pour stocker les modèles de voitures uniques
  const [colors, setColors] = useState([]); // State pour stocker les couleurs de voitures uniques
  const [selectedModel, setSelectedModel] = useState(''); // State pour stocker le modèle sélectionné
  const [selectedColor, setSelectedColor] = useState(''); // State pour stocker la couleur sélectionnée

  // Utilisation de useEffect pour appeler l'API searchCars et récupérer les modèles et les couleurs de voitures uniques
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchCars('');
      const uniqueModels = [...new Set(data.map(car => car.model))];
      const uniqueColors = [...new Set(data.map(car => car.color))];
      setModels(uniqueModels);
      setColors(uniqueColors);
    };
    
    if (models.length === 0 && colors.length === 0) {
      fetchData();
    }
  }, [models, colors]);

  // Gestionnaire d'événements pour le changement de modèle sélectionné
  function handleModelChange(event) {
    const value = event.target.value;
    setSelectedModel(value);
    onFilterChange({ model: value, color: selectedColor });
  }

  // Gestionnaire d'événements pour le changement de couleur sélectionnée
  function handleColorChange(event) {
    const value = event.target.value;
    setSelectedColor(value);
    onFilterChange({ model: selectedModel, color: value });
  }

  // Affichage des options de sélection de modèle et de couleur
  return (
    <div>
      <label htmlFor="model-select">Choose a model:</label>
      <select id="model-select" value={selectedModel} onChange={handleModelChange}>
        <option value="">All models</option>
        {models.map(model => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>

      <br />

      <label htmlFor="color-select">Choose a color:</label>
      <select id="color-select" value={selectedColor} onChange={handleColorChange}>
        <option value="">All colors</option>
        {colors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
    </div>
  );
};