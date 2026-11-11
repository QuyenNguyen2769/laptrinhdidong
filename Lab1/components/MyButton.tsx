import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

interface MyButtonProps{
    label:string;
    onPress: () =>void;
    color?: string;
}

const MyButton = ({label, onPress, color = '#007AFF'}:MyButtonProps)=>{
    return(
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.button,{backgroundColor:color}]}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    
    )
}

const styles= StyleSheet.create({
    button:{
        paddingVertical: 12,
        paddingHorizontal:20,
        borderRadius:10,
        alignItems:'center',
        marginVertical:10,
    },
    text:{
        color: 'white',
        fontWeight: 'bold',
    }
})

export default MyButton;