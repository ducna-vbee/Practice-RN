import React from 'react';
import { TextInput,View } from 'react-native';

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

const FetchView = () => {
    const referenceToTextInput1 = React.useRef<TextInput>(null);
    const referenceToTextInput2 = React.useRef<TextInput>(null);
 

    return (
        <View>
            <TextInput
                ref={referenceToTextInput1}
                onFocus={(event) => {
                    referenceToTextInput2.current?.blur();
                }}
            />
            <TextInput
                ref={referenceToTextInput2}
                onFocus={(event) => {
                    referenceToTextInput1.current?.blur();
                }}
            />
        </View>
    );
};

export default FetchView;