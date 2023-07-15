import { useState, useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY } from '@env'


const useFetch = (endpoint , query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);


  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
    ...query
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsloading(true)

    try {
        const response = await axios.request(options);
        setData(response.data.data)
    }
    catch (error) {
        setError("There is an Error")
    } 
    finally
    {
        setIsloading(false)
    }

  }

  useEffect( ()=>{
    fetchData();    
  },[])

  const refetch = () => {
    fetchData();
  }
  
  return { data , isLoading ,error , refetch}
};

export default useFetch