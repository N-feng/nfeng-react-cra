import { useEffect, useState } from 'react';
import { request } from '../utils/request'

const API_BASE = process.env.API_URL || ''

const useFetch = (endpoint: string, query: any, method?: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: method || 'GET',
    url: `${API_BASE}/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {
      // query: 'Python developer in Texas, USA',
      // page: '1',
      // num_pages: '1'
      ...query
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;