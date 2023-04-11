import { useEffect, useState } from 'react';
import { searchCars } from '@/api/cars.js';

export const CarFilter = () => {
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
  
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
  
    function handleModelChange(event) {
      const value = event.target.value;
      setSelectedModel(value);
      onFilterChange({ model: value, color: selectedColor });
    }
  
    function handleColorChange(event) {
      const value = event.target.value;
      setSelectedColor(value);
      onFilterChange({ model: selectedModel, color: value });
    }
  
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