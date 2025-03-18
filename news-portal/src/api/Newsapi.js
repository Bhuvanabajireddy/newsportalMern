import axios from 'axios';

const API_KEY = 'pub_710536f4f69fea0d116da19c9f0363bf2b948';

export const fetchNews = async (category) => {
  const apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=${category}&country=in`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};