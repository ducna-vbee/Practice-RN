import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import { SampleJSONData,SampleJSONDataServices } from "@/services/SampleJSONDataServices";
import React from 'react';
import { ActivityIndicator,FlatList,ScrollView,Text,TouchableOpacity,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ListView = () => {
    const dataSampleURL = "https://jsonplaceholder.typicode.com/posts";
    const screenDimensionContext = React.useContext(ScreenDimensionContext);
    const [data,setData] = React.useState<SampleJSONData[]>([]);
    const [fetchState,setFetchState] = React.useState(false);
    const [error,setError] = React.useState<string|null>(null);

    async function fetchData(url: string)
    {
        setFetchState(true);

        await fetch(url,{
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async (response) => {
            let jsonResponse = await response.json();
            setData(jsonResponse);
        }).catch((error) => {
            setData(error);
        }).finally(() => {
            setFetchState(false);
        });
    }

    async function fetchDataWithServices()
    {
        try
        {
            const sampleJSONData = await SampleJSONDataServices.fetch();
            setData(sampleJSONData);
        }
        catch (error: any)
        {
            setError(JSON.stringify(error));
        }
        finally
        {
            setFetchState(false);
        }
    }

    React.useEffect(() => {
        fetchData(dataSampleURL);
        //fetchDataWithServices();
    },[]);

    const DataList = () => {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => (item.id).toString()}
                renderItem={({item}) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                maxHeight: 100,
                                borderWidth: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                gap: 0,
                            }}
                        >
                            <View   
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: 100,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>{item.id}</Text>
                            </View>
                            <View   
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: 100,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>{item.userId}</Text>
                            </View>
                            <View   
                                style={{
                                    flex: 3,
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: 100,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>{item.title}</Text>
                            </View>
                            <View
                                style={{
                                    flex: 10,
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <ScrollView   
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        maxHeight: 100,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflowX: 'scroll',
                                    }}
                                >
                                    <Text>{item.body}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    );
                }}
            />
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                maxWidth: screenDimensionContext.screenWidth,
                maxHeight: screenDimensionContext.screenHeight,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 19,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {(fetchState === true) ? (
                    <ActivityIndicator/>
                ) : (
                    <DataList/>
                )}
            </View>
            <View
                style={{
                    flex: 9,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 1000,
                        borderWidth: 2,
                        borderColor: '#0F0F0F',
                    }}
                    onPress={() => {
                        fetchData(dataSampleURL);
                        //fetchDataWithServices();
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: 16,
                        }}
                    >{"Fetch"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ListView;