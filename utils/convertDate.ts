/* eslint-disable max-len */
export const convertDate = (inputDate: any) => {
    const parsedDate = new Date(inputDate);

    // Format the date as YYYY-MM-DD
    const formattedDate = `${(`0${parsedDate.getDate()}`).slice(-2)}-${(`0${parsedDate.getMonth() + 1}`).slice(-2)}-${parsedDate.getFullYear().toString().substr(-2)}`;

    return formattedDate;
}