import axios from 'axios';

const dictionaryAPI = axios.create({
    baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
});

export const getDefinition = (searchValue) => {
    return dictionaryAPI.get(`/${searchValue}`).then((data) => {
        return data.data;
    });
}