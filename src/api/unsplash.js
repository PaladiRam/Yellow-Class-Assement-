import axios from  'axios';
export default axios.create ({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID f92ac8f429bf8015e4dc562c80ce08b27f337a2a544c22b3502d5dcfe18b7504'
    }
})
