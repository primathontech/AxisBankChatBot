export const convertToIndianNumberFormat = (number: any) => {
    if (number >= 10000000) {
        return `${(number / 10000000).toFixed(0)} Crores`;
    } if (number >= 100000) {
        return `${(number / 100000).toFixed(0)} Lakhs`;
    } if (number >= 1000) {
        return `${(number / 1000).toFixed(0)} Thousands`;
    }
    return number.toString();

}