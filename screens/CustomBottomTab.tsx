import React from "react";
import { ColorValue,DimensionValue,Image,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const CustomBottomTabIcon = ({ width,height,uri }: { width: DimensionValue,height: DimensionValue,uri: string }) => {
    return (
        <Image
            source={{
                uri: uri,
            }}
            style={{
                width: width,
                height: height,
            }}
        />
    );
};

interface CustomBottomTabInterface
{
    width: DimensionValue,
    height: DimensionValue,
    visibility: boolean,
    backgroundColor: ColorValue,
    numberOfTabs: number,
    minTabWidth: DimensionValue,
    maxTabWidth: DimensionValue,
    iconSize: DimensionValue,
    labels: string[],
    iconURIs: string[],
    setActiveIndex: (previousState: number) => void,
};

const CustomBottomTab = ({ width,height,visibility,backgroundColor,numberOfTabs,minTabWidth,maxTabWidth,labels,iconSize,iconURIs,setActiveIndex}: CustomBottomTabInterface) => {
    return (
        <SafeAreaView
            style={{
                ...Styles.mainScreen,
                ...{
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    display: (visibility === true) ? 'flex' : 'none',
                },
            }}
        >
            <View
                style={{
                    ...Styles.mainContent,
                    ...{
                        width: width,
                        height: height,
                    },
                }}
            >
                <View
                    style={{
                        ...Styles.section,
                        ...{
                            minWidth: minTabWidth,
                            maxWidth: maxTabWidth,
                        },
                    }}
                >
                    <TouchableOpacity
                        style={Styles.tab}
                        onPress={() => {
                            setActiveIndex(0);
                        }}
                    >
                        <CustomBottomTabIcon
                            width={iconSize}
                            height={iconSize}
                            uri={iconURIs[0]}
                        />
                        <Text
                            style={Styles.label}
                        >{labels[0]}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...Styles.section,
                        ...{
                            minWidth: minTabWidth,
                            maxWidth: maxTabWidth,
                        },
                    }}
                >
                    <TouchableOpacity
                        style={Styles.tab}
                        onPress={() => {
                            setActiveIndex(1);
                        }}
                    >
                        <CustomBottomTabIcon
                            width={iconSize}
                            height={iconSize}
                            uri={iconURIs[1]}
                        />
                        <Text
                            style={Styles.label}
                        >{labels[1]}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...Styles.section,
                        ...{
                            minWidth: minTabWidth,
                            maxWidth: maxTabWidth,
                        },
                    }}
                >
                    <TouchableOpacity
                        style={Styles.tab}
                        onPress={() => {
                            setActiveIndex(2);
                        }}
                    >
                        <CustomBottomTabIcon
                            width={iconSize}
                            height={iconSize}
                            uri={iconURIs[2]}
                        />
                        <Text
                            style={Styles.label}
                        >{labels[2]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const Styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 700,
    },
});

export default CustomBottomTab;