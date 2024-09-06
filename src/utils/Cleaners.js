export const cleanName = (str) => {
  let name = str.replace(/-/g, ' ');
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

export const cleanPokemonName = (str) => {
  let name = str.replace(/-/g, ' ');
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
}

export const cleanDescription = (str) => {
  return str.replace(/\f/g, ' ');
}

export const cleanNumber = (num) => {
  return num.toString().padStart(3, '0');
}

export default cleanName;