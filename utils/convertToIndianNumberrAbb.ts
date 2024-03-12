export const convertToIndianNumberFormatAbs = (number: any) => {
    if (number >= 10000000) {
        return `${(number / 10000000).toFixed(0)} Cr`;
    } if (number >= 100000) {
        return `${(number / 100000).toFixed(0)} L`;
    } if (number >= 1000) {
        return `${(number / 1000).toFixed(2)} Th`;
    }
    return number.toString();

}