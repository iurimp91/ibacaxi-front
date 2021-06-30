export default function formatNumber(int) {
    const str = String(int).padStart(3, "0");
    const formattedNumber = `
    ${str.slice(0, str.length - 2)},${str.slice(-2)}`;
    return formattedNumber;
}
