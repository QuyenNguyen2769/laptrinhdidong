import React, { useState } from 'react'
import { Button, Text, TouchableOpacity, View,StyleSheet } from 'react-native';

type Gender = 'male' | 'female' | 'other';

export default function GenderSelector() {
    const [gender, setGender] = useState<Gender>('male');
  return (
    <View >
        <Text>Giới tính đang chọn: {gender}</Text>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => setGender('male')}>
                <Text>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setGender('female')}>
                <Text>Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setGender('other')}>
                <Text>Khác</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        gap:10,
        marginTop:20,
    },
    button:{
        backgroundColor:'#da0f48',
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:10,
    }
})