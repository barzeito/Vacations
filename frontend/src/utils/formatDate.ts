function formatDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-GB');
    return `${formattedDate}`;
}
export default formatDate;
