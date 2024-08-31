export const capitalise = (string) => { 
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const cleanDescription = (str) => {
    return str.replace(/\f/g, ' ');
}

export const addZeros = (num) => {
    return num.toString().padStart(3, '0');
}

export default capitalise;