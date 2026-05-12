import networkService from "@/services/networkService";
import React from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Network = () => {
    const [loadingPercentage,setLoadingPercentage] = React.useState(0);
    const [feedbackState,setFeedbackState] = React.useState<boolean>(false);
    const [readState,setReadState] = React.useState<boolean>(false);

    async function uploadData(data: any,uri: string)
    {
        return networkService.post(uri,data,{
            onUploadProgress: (progressEvent) => {
                const loadingPercentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total as number));
                setLoadingPercentage(loadingPercentage / 100);
            },
        });
    };

    async function downloadData(uri: string)
    {
        const response = await networkService.get(uri,{
            onDownloadProgress: (progressEvent) => {
                const loadingPercentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total as number));
                setLoadingPercentage(loadingPercentage / 100);
            },
            timeout: 5000,
            maxRate: [
                100 * 1024,
                50 * 1024
            ],
        });

        setReadState(false);
        
        return response.data;
    };

    async function sendFeedback()
    {
        const response = await networkService.post("/feedback",{
            timeOut: 5000,
        });

        return response.data;
    }

    return (
        <SafeAreaView
            style={Styles.main}
        >
            <View
                style={{
                    ...Styles.mainSection,
                    ...{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: '#ff7b00',
                    }
                }}
            >
                <View
                    style={{
                        width: 100,
                        height: 10,
                        borderWidth: 2,
                        borderColor: '#FFFFFF',
                        borderRadius: 4,
                    }}
                >
                    <View
                        style={{
                            width: `${loadingPercentage * 100}%`,
                            height: '100%',
                            backgroundColor: '#a6ff00',
                        }}
                    >

                    </View>
                </View>
            </View>
            <View
                style={{
                    ...Styles.mainSection,
                    ...{
                        flex: 6,
                        flexDirection: 'column',
                    },
                }}
            >
                <View
                    style={{
                        ...Styles.mainContent,
                        ...{
                            flex: 1,
                            borderWidth: 1,
                        },
                    }}
                >

                </View>
                <View
                    style={{
                        ...Styles.mainContent,
                        ...{
                            flex: 3,
                            flexDirection: 'row',
                            gap: 20,
                        },
                    }}
                >
                    <TouchableOpacity
                        style={{
                            ...Styles.button,
                            ...{
                                backgroundColor: (feedbackState === true) ? "#00ff0d" : "#ff0000"
                            },
                        }}
                        onPress={async () => {
                            try
                            {
                                setFeedbackState(prev => !prev);
                                await sendFeedback();
                            }
                            catch
                            {
                                alert("Something was wrong with the feedback!");
                                setFeedbackState(prev => !prev);
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: 20,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                            }}
                        >{"FEEDBACK"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...Styles.button,
                            ...{
                                backgroundColor: (readState === true) ? "#00ff0d" : "#ff0000"
                            },
                        }}
                        onPress={async() => {
                            setLoadingPercentage(0);
                            setReadState(true);
                            //const response = await downloadData("https://api.jsons.live/Amazon/1-level/10-MB/minified");
                            const response = await downloadData("https://httpbin.org/status/404");
                            //console.log(response);
                            console.log("Finished! Content length: `" + JSON.stringify(response).length + "`.");
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: 20,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                            }}
                        >{"READ"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainSection: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        height: 100,
        aspectRatio: 1 / 1,
        backgroundColor: '#ff0000',
        borderRadius: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0F0F0F',
        shadowRadius: 2,
        elevation: 100,
    },
});

export default Network;