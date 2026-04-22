import { StackActions,useNavigation,useRoute } from "@react-navigation/native";
import { Text,TouchableOpacity,View } from "react-native";

const NumberView = () => {
    const navigator = useNavigation();
    const route = useRoute();
    const content: {content: number} = route.params as {content: number};

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
        </View>
    );
};

export default NumberView;