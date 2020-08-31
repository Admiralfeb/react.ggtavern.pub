export const fetchfromApi = async <T,>(uri: string): Promise<T> => {
    try {
        const response = await fetch(uri);
        if (response.ok) {
            const itemData: T = await response.json();
            return itemData;
        } else {
            throw new Error('Error retrieving data from server');
        }
    } catch (err) {
        throw err;
    }
};
