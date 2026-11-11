import React, {useState} from 'react'
import { View,Text,Button, StyleSheet } from 'react-native';

const Counter = () =>{
    const [count, setCount] = useState<number>(0);
    const Tang = () => setCount(count +1);
    const Giam = () => {
        if(count > 0 ) setCount(count -1);
    };
    return (
        <View>
            <Text>Giá trị hiện tại: {count}</Text>
            <View style={styles.button}>
                <Button title='Giảm' onPress={Giam}/>
            </View>
            <View style={styles.button}>
                <Button title='Tăng' onPress={Tang}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{ 
        borderRadius:10,
        padding:10,
        margin: 10,
    }
})

export default Counter;