import { StackActions,useNavigation } from '@react-navigation/native';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Dangle1 = () => {
    const navigator = useNavigation();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >{"Dangle1"}</Text>
            <TouchableOpacity
                style={{
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: '#0F0F0F',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop:8,
                    paddingBottom: 8,
                }}
                onPress={() => {
                    navigator.dispatch(StackActions.pop(2));
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                    }}
                >{"Back"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default Dangle1;