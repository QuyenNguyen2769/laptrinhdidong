import React, {useState} from 'react'
import { View, Text, TextInput,StyleSheet } from 'react-native'

const LiveInput = () => {
    const [text, setText]= useState<string>('');

    return(
        <View style={styles.box}>
            <Text>Nhập bình luận của bạn: </Text>
            <TextInput style={{borderRadius:10, borderWidth:1, padding:12}} placeholder='Hãy gõ gì đó đi...' value={text} onChangeText={(newText) => setText(newText)}></TextInput>
            <Text>Số ký tự đang gõ: <Text>{text.length}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        padding:10,
        margin:10,
        gap: 10,
    }
})

export default LiveInput