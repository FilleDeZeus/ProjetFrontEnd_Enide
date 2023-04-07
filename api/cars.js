export const searchCars = async (query) => {
  const response = await fetch(`https://example-data.draftbit.com/cars?q=${query}`);
  const data = await response.json();
  return data.filter((car) => {
    const regex = new RegExp(`^${query}`, 'i');
    return regex.test(car.model) || regex.test(car.make_id);
  });
};