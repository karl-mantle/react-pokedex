export const capitalise = (str) => { 
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

export const cleanName = (str) => {
  /* will need to add fixes for Farfetch'd, Mr. Mime, Ho-oh */
  /* nidoran name fix */
  let name = str.replace(/-m$/, ' (m)').replace(/-f$/, ' (f)');
  /* remove dashes and capitalise */
  name = name.replace(/-/g, ' ');
  name = name.replace(/(^\w|\s\w)/g, char => char.toUpperCase());
  return name;
}

export const cleanDescription = (str) => {
  return str.replace(/\f/g, ' ');
}

export const addZeros = (num) => {
  return num.toString().padStart(3, '0');
}

export default capitalise;