export const cleanName = (str) => {
  let name = str.replace(/-/g, ' ');
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

export const cleanEffect = (str) => {
  return str.replace(/\n/g, ' ');
}

export const cleanNumber = (num) => {
  return num.toString().padStart(3, '0');
}

export const cleanMoveData = (str) => {
  let name = str.charAt(0).toUpperCase() + str.slice(1);
  name = name.replace(/([A-Z])/g, ' $1').trim();
  return name;
}

export const cleanMoveValues = (str) => {
  if (typeof str !== 'string') {
    str = String(str);
  }
  let name = str.replace(/ailment/gi, 'status');
  name = name.replace(/\+/g, ' + ');
  name = name.replace(/-/g, ' ');
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return name;
};

export default cleanName;