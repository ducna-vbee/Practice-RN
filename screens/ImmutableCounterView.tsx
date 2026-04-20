import React,{ useState } from "react";
import { Button,Text,View } from "react-native";

const ImmutableCounter = ({key, content }: { key:React.Key,content: number }) => {
    console.log(`Child with content ${content} rendered!`);
    
    return (
        <View 
            style={{ 
                width: 100,
                height: 50,
                borderWidth: 1,
            }}
        >
            <Text style={{ fontSize: 16, color: '#0F0F0F' }}>{content}</Text>
        </View>
    );
};

const MemorizedImmutableCounter = React.memo(ImmutableCounter);


const ImmutableCounterView = () => {
    const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0]);

    const updateSpecificCounter = (indexToUpdate: number) => {
        const newCounters = [...counters];
        newCounters[indexToUpdate] = newCounters[indexToUpdate] + 1;
        setCounters(newCounters);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {counters.map((value, index) => (
                <MemorizedImmutableCounter 
                    key={index}
                    content={value} 
                />
            ))}
            
            <Button title="Update Index 2" onPress={() => updateSpecificCounter(2)} />
        </View>
    );
};

export default ImmutableCounterView;