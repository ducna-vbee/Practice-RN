import ScreenDimensionContext from "@/contexts/ScreenDimensionContext";
import React from 'react';
import { FlatList,ScrollView,Text,TouchableOpacity,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface SampleDataInterface
{
    userId: number,
    id: number,
    title: string,
    body: string,
};

const ListView = () => {
    const screenDimensionContext = React.useContext(ScreenDimensionContext);
    const dataSampleURL: string = "https://jsonplaceholder.typicode.com/posts";
    const [data,setData] = React.useState({});

    async function fetchData(url: string)
    {
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
        });
    }

    React.useEffect(() => {
        fetchData(dataSampleURL);
    },[]);

    const DataList = () => {
        return (
            <FlatList
                data={Array.from(data as SampleDataInterface[])}
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
                <DataList/>
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