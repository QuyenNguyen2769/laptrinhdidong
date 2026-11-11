import React,{Children, PropsWithChildren} from 'react'
import { View, ActivityIndicator } from 'react-native'

type LoadingProps = PropsWithChildren<{
    isLoading: boolean;
}>;
export default function LoadingContainer({isLoading, children}: LoadingProps) {
    if(isLoading){
    return (
        <View style={{padding:20, alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );
    }
  return(
    <View>
        {children}
    </View>
  );
}
