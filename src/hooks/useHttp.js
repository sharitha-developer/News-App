import { useCallback, useState, useEffect } from "react";

async function sendHttpRequest(url, config) {
   const response = await fetch(url, config);

   const resData = await response.json();
   if (!response.ok) {
      throw new Error(
         resData.message || 'Something went wrong, failed to send request'
      )
   }
   return resData;
}

export function useHttp(pageLoc, category, numbofPosts, config, initialData) {
   const apiKey = import.meta.env.VITE_GNEWS_API_KEY;  
   const [data, setData] = useState(initialData);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   function clearData() {
      setData(initialData)
   }
   const sendRequest = useCallback(async function sendRequest(data) {
      setIsLoading(true);
      try {
         const resData = await sendHttpRequest(
            `https://gnews.io/api/v4/${pageLoc}?category=${category}&lang=en&country=us&max=${numbofPosts}&apikey=${apiKey}`,
            { ...config, body: data }
         );
         setData(resData);
      }
      catch (error) {
         setError(error.message || 'Something went wrong !');
      }
      setIsLoading(false);
   }, [pageLoc, category, numbofPosts, config, apiKey])

   useEffect(() => {
      // if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
      // }

   }, [sendRequest])
   return {
      data,
      isLoading,
      error,
      sendRequest,
      clearData,
   }

}