import axios from 'axios';

const API_KEY = "44822102-6d1d7649cda1a595bd957c97f";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page, perPage) {
    // const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    // return fetch(URL).then(res => {
        
    //     console.log(res);

    //     if (!res.ok) {
    //         throw new Error(res.status)
    //     }

    //     return res.json();
    // })
    
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage
    }
    
    const response = await axios.get(BASE_URL, { params });
    return response.data;
}