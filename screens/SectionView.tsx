import { SectionList,Text,View } from "react-native";

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
        return (
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
        );
    };

    export default SectionView;