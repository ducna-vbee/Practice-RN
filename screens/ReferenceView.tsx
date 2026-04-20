import React,{ RefObject } from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";


function createReferenceAnonymously(): {current: View | null}
{
    console.log("created a newly anonymous reference");

    return {
        current: null as View | null,
    };
}

let anonymousReference = createReferenceAnonymously();

function createReferencePersistently() : RefObject<View|null>
{
    console.log("created a newly persistent reference");

    return React.createRef<View>();
}

let persistentReference = createReferencePersistently();

const ReferenceView = () => {
    const [counter,setCounter] = React.useState(0);
    const reference = React.useRef(null);
    const [componentExistence,setComponentExistence] = React.useState(true);
    const locallyPersistentReference = createReferencePersistently();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1);
        },1000);

        return () => {
            clearInterval(interval);
        };
    },[counter]);

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
            <View
                ref={reference}
                style={{
                    ...Styles.mainSection,
                }}
            >

            </View>
            <View
                ref={locallyPersistentReference}
                style={{
                    ...Styles.mainSection,
                }}
            >

            </View>
            {(componentExistence === true) ? (
                <View
                    ref={anonymousReference}
                    style={{
                        ...Styles.mainSection,
                    }}
                >

                </View>
            ) : (
                null
            )}
            <View
                ref={persistentReference}
                style={{
                    ...Styles.mainSection,
                }}
            >

            </View>
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
                    if (anonymousReference != null && anonymousReference.current != null)
                    {
                        anonymousReference.current.measure((x,y,width,height,pageX,pageY) => {
                            console.log(x,y,width,height,pageX,pageY);
                        })
                    }
                    
                    if (componentExistence === true)
                    {
                        setComponentExistence(false);
                    }
                }}
            >
                <Text
                    style={{
                        color: '#0F0F0F',
                        fontSize: 16,
                    }}
                >{"LOG"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    mainSection: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReferenceView;