import React from 'react';

function useFetch<T>(url: string)
{
    const [data,setData] = React.useState<T | null>(null);
    const [loadingState,setLoadingState] = React.useState(true);
    const [error,setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mountedState = true;

        const fetchData = async() => {
            setLoadingState(true);

            try
            {
                const response = await fetch(url);
                const result = await response.json();
                if (mountedState) setData(result);
            } 
            catch (error)
            {
                if (mountedState) setError("Failed to fetch data with error: " + JSON.stringify(error));
            }
            finally
            {
                if (mountedState) setLoadingState(false);
            }
        };

        fetchData();

        return () => { mountedState = false; };
    },[url]);

    return { data,loading: loadingState,error };
};