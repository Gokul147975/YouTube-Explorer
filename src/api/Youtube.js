import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/search`, {
        params: {
            part: 'snippet',
            q: query,
            maxResults: 12,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
            type: 'video',
        },
    });
    return data.items;
};

export const fetchVideoDetails = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/videos`, {
        params: {
            part: 'snippet,statistics',
            id,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
    });
    return data.items[0];
};
