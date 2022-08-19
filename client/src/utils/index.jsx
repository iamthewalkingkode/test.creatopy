const prefix = 'crtp_';


export const numberFormat = (number, minimumFractionDigits = 0) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits }).format(number);
}


// ::: storage helpers
export const setStorage = (key, value) => {
    if (key && value) {
        localStorage.setItem(prefix + key, value);
    }
}
export const getStorage = (key) => {
    const value = localStorage.getItem(prefix + key);
    return value || '';
}
export const setStorageJson = (key, value) => {
    if (key && value) {
        localStorage.setItem(prefix + key, JSON.stringify(value));
    }
}
export const getStorageJson = (key) => {
    if (key) {
        const value = localStorage.getItem(prefix + key);
        return JSON.parse(value) || '';
    }
}
export const delStorage = (key) => {
    if (key) {
        localStorage.removeItem(prefix + key);
    }
}