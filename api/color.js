export async function fetchColors() {
    const response = await fetch('/api/colors');
    const data = await response.json();
    return data.colors;
  }