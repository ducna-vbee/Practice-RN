import RootStackParamList from "@/navigations/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SectionList,Text,TouchableOpacity,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleDataWithSections = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];

const SectionView = () => {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            <View
                style={{
                    flex: 4,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SectionList
                    sections={sampleDataWithSections}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <View   
                            style={{
                                flex: 3,
                                width: '100%',
                                height: '100%',
                                maxHeight: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text 
                                style={{
                                    fontSize: 14,
                                    color: '#0F0F0F',
                                }}
                            >{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View   
                            style={{
                                flex: 3,
                                width: '100%',
                                height: '100%',
                                maxHeight: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text 
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    color: '#0F0F0F',
                                }}
                            >{title}</Text>
                        </View>
                    )}
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
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
                        navigator.navigate("ImageView");
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >{"ImageView"}</Text>
                </TouchableOpacity>
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
                        console.log(navigator.getState().routes);
                        navigator.goBack();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >{"Back"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SectionView;