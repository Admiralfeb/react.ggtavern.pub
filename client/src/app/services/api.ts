export const fetchfromApi = async <T,>(uri: string, query?: any): Promise<T> => {
    try {
        let queryString = '';
        if (query) {
            queryString = new URLSearchParams(query).toString();
        }
        let fulluri = uri + (queryString ? `?${queryString}` : '');
        const response = await fetch(fulluri);
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
