import React, {useState} from 'react'
import { View,Text,StyleSheet } from 'react-native'

interface Todo{
    id:string;
    title: string;
}

const TodoBasic = () =>{
    const [todos, setTodos]=useState<Todo[]>
    ([
        {id:'1', title:'Học React Native'},
        {id:'2', title:'Làm bài tập về nhà'},
        {id:'3', title:'Học Tiếng anh'},
    ]);

    return(
        <View>
        <Text>Danh sách công việc:</Text>
        {todos.map((item) => (
            <View key={item.id}>
                <Text>{item.title}</Text>
            </View>
        ))}
        </View>
    );
};
export default TodoBasic;
