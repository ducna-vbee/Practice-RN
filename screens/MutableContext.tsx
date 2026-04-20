import React from 'react';
import { Text,TouchableOpacity,View } from 'react-native';

const MutableContext = React.createContext({
    serializedData: "",
    setSerializedData: (previousState: string) => {},
    index: 0,
    setIndex: (previousState: number) => {},
});

const MutableContextContent = () => {
    console.log("`MutableContextContent` is re-rendered!");

    return (
        <View
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
            
        </View>
    );
};

const MemorizedContextContent = React.memo(MutableContextContent);

const MutableContextView = () => {
    const [serializedData,setSerializedData] = React.useState<string>("");
    const [index,setIndex] = React.useState<number>(0);

    return (
        <MutableContext.Provider
            value={{
                serializedData: serializedData,
                index: index,
                setSerializedData: setSerializedData,
                setIndex: setIndex,
            }}
        >
            <View
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
                <MemorizedContextContent/>
                <TouchableOpacity
                    style={{
                        borderRadius: 1000,
                        borderWidth: 2,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        setIndex(index + 1);
                    }}
                >
                    <Text>{"Increment"}</Text>
                </TouchableOpacity>
            </View>
        </MutableContext.Provider>
    );
};

export default MutableContextView;