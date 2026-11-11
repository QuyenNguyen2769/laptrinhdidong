import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface UserCardProps{
    name: string;
    age: number;
    isAdmin: boolean;
}

const UserCard= ({name,age,isAdmin}: UserCardProps)=>{
    return (
        <View style={styles.card}>
            <Text>Tên: {name}</Text>
            <Text>Tuổi: {age}</Text>
            {isAdmin ? <Text style={styles.admin}>Admin</Text>:null}
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        padding:10,
        borderWidth:1,
        borderColor:"#ccc",
        margin: 10,
        borderRadius:10,
    },
    admin:{color:'red',fontWeight:'bold'}
})
export default UserCard;
