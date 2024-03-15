export const timeConverter = () => {
    const userTime = new Date();
    let hours = userTime.getHours();
    const minutes = userTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;
    const finalTime = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;
    return finalTime;

}