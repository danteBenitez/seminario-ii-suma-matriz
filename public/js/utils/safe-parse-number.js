/**
 * Intenta parsear un string a número, si no puede retorna null 
 * @param {string} value 
 */
export function safeParseNumber(value) {
    if (value == "") return null;
    const number = parseFloat(value);
    if (Number.isNaN(number)) {
        return null;
    }
    return number;
}

/**
 * Intenta parsear un string a entero, si no puede retorna null
 * @param {string} value 
 */
export function safeParseInt(value) {
    if (value == "") return null;
    const number = parseInt(value);
    if (Number.isNaN(number)) {
        return null;
    }
    return number;
}