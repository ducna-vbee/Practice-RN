import { RouteProp,StackActions,useFocusEffect,useNavigation,useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import RootStackParamList from "../navigations/RootStackParamList";

const NumberView = () => {
    const navigator = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'NumberView'>>();
    const content: {content: number} = route.params;

    useFocusEffect(
        React.useCallback(() => {
            console.log("Screen Focused - Content:", content);
            return () => console.log("Screen Blurred");
        }, [content])
    );

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={Styles.section}
            >
                <TouchableOpacity   
                    style={Styles.button}
                    onPress={() => {
                        navigator.dispatch(StackActions.popToTop());
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 800,
                            color: '#0F0F0F',
                        }}
                    >{content.content}</Text>
                </TouchableOpacity>
                <TouchableOpacity   
                    style={Styles.button}
                    onPress={() => {
                        navigator.dispatch(StackActions.push("ImageView"));
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 800,
                            color: '#0F0F0F',
                        }}
                    >{"ImageView"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    section: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#0F0F0F',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
    },
});

export default NumberView;