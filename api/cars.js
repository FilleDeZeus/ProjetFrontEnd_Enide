export const searchCars = async (query) => {
  // Effectuer une requête à l'API en utilisant fetch et en ajoutant le paramètre de recherche à l'URL
  const response = await fetch(`https://example-data.draftbit.com/cars?q=${query}`);
  
  // Attend rep de l'API et convertir  JSON
  const data = await response.json();

  // Filtrer les données reçues en fonction du texte de recherche
  return data.filter((car) => {
    const regex = new RegExp(`^${query}`, 'i');
    return regex.test(car.model) || regex.test(car.make_id);
  });
};
