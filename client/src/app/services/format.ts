export const formatAsUSD = (value: string | number): string => {
    let numberValue = 0;
    if (typeof value === 'string') {
        try {
            numberValue = parseFloat(value);
        } catch (err) {
            throw err;
        }
    } else {
        numberValue = value;
    }
    const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return numberFormat.format(numberValue);
}

export const formatAsTitleCase = (str: string): string => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
