import { StyleSheet,View } from "react-native";

const Flexible = () => {
    return (
        // <View
        //     style={{
        //         flex: 1,
        //         width: '100%',
        //         height: '100%',
        //         display: 'flex',
        //         flexDirection: 'row',
        //         alignItems: 'flex-start',
        //         justifyContent: 'center',
        //         flexWrap: 'wrap',
        //         alignContent: 'center',
        //     }}
        // >
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        //     <View
        //         style={{
        //             ...Styles.viewBox,
        //             ...{
        //                 width: 400,
        //                 height: 200,
        //             },
        //         }}
        //     ></View>
        // </View>
        <View
            style={{
                flex: 1,
                 width: '100%',
                height: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 10,
            }}
        >
            <View style={[Styles.viewBox,{ width: 150,height: 100 ,flexShrink: 2,}]} />
            <View style={[Styles.viewBox,{ width: 150,height: 100, flexGrow: 1, }]} />
            <View style={[Styles.viewBox,{ width: 150,height: 100 ,flexBasis: 150}]} />
            <View style={[Styles.viewBox,{ width: 150,height: 100 }]} />
            <View style={[Styles.viewBox,{ width: 150,height: 100 }]} />
            <View style={[Styles.viewBox,{ width: 150,height: 100 }]} />
        </View>
    );
};

const Styles = StyleSheet.create({
    viewBox: {
        borderWidth: 2,
    },
});

export default Flexible;