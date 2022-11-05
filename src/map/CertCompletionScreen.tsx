import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Lottie from 'lottie-react-native';

export default function CertCompletionScreen() {
    const navi = useNavigation();
    return <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: '90%', width: '70%', alignSelf: 'center' }}>
            <Lottie source={require('../assets/success.json')} autoPlay loop />
        </View>
        <TouchableOpacity style={{ backgroundColor: '#00C885', borderRadius: 20, justifyContent: 'center', marginHorizontal: 30, position: 'absolute', bottom: 30, left: 0, right: 0 }}
            onPress={() => navi.goBack()}>
            <Text style={{ color: '#FFF', textAlign: 'center', paddingVertical: 12, fontWeight: 'bold', }}>확인</Text>
        </TouchableOpacity>
    </SafeAreaView>
}