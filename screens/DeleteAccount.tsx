import { useAppDispatch,useAppSelector } from "@/store";
import React from "react";
import { StyleSheet,Text,TextInput,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const DeleteAccount = () => {
    const dispatch = useAppDispatch();
    const [reason,setReason] = React.useState("");
    const { id, timeLeft } = useAppSelector(state => state.user.deletionSession);

    return (
        <SafeAreaView
            style={{
                ...Styles.mainView,
                ...{

                },
            }}
        >
            <View
                style={{
                    ...Styles.section,
                    ...{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }
                }}
            >
                <Text
                    style={{
                        color: '#0F0F0F',
                        fontSize: 20,
                    }}
                >{"DELETE ACCOUNT"}</Text>
            </View>
            <View
                style={{
                    ...Styles.section,
                    ...{
                        flex: 6,
                        flexDirection: 'column',
                        padding: 20,
                        justifyContent: 'space-between',
                    }
                }}
            >
                <TextInput
                    value={reason}
                    placeholder="Enter the reason of account deletion..."
                    style={{
                        width: '100%',
                        height: 55,
                        borderWidth: 2,
                        borderColor: '#0F0F0F',
                        borderRadius: 1000,
                        paddingLeft: 16,
                    }}
                    onChangeText={(value: string) => {
                        setReason(value);
                    }}
                />
                <TouchableOpacity
                    style={{
                        borderRadius: 1000,
                        borderWidth: 2,
                        borderColor: '#0F0F0F',
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom:8
                    }}
                    onPress={async () => {
                        dispatch({
                            type: "user/CONFIRM_DELETION",
                            payload: { reason, sessionID: id },
                        });
                    }}
                >
                    <Text
                        style={{
                            color: '#0F0F0F',
                            fontSize: 16,
                        }}
                    >{"Confirm "} {timeLeft} {"?"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const Styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

export default DeleteAccount;