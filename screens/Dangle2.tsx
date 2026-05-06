import {
    Text,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Dangle2 = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >{"Dangle1"}</Text>
        </SafeAreaView>
    )
};

export default Dangle2;