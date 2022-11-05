import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet , Image, FlatList } from "react-native";
import Swiper from 'react-native-swiper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MypageScreen() {


    const data1 = [
        {
            text: '등산하기 인증',
            image: 'https://images.pexels.com/photos/1822458/pexels-photo-1822458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            text: '코노 가기 인증',
            image: 'http://res.heraldm.com/content/image/2020/11/09/20201109000736_0.jpg',
        },
        {
            text: '명동 거리 걷기 인증',
            image: 'https://previews.123rf.com/images/zz3701/zz37011703/zz3701170300363/84302072-%EB%AA%85%EB%8F%99-%EA%B1%B0%EB%A6%AC%EC%9D%98-%EC%82%AC%EB%9E%8C%EB%93%A4-%EC%84%9C%EC%9A%B8.jpg',
        },
    ]


    const renderItem1 = ({item}) => {
        return <View style={{marginRight: 10}}>
            <Text>{item.text}</Text>
            <Image
            source={{uri: item.image}}
            style={{width: 150, height: 150}}
             />
        </View>
    }


    return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{width: '100%', height: 150, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'left', fontSize: 25, fontWeight: "bold", marginLeft: 10}}>앱 이름</Text>
                <Icon style={{marginRight: 10}} name="bell-outline" size={25}  />
            </View>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20 ,marginBottom: 10}}>내 주변</Text>
        <FlatList
        style={{marginLeft: 10, marginRight: 10}}
            //WebView 집어 넣을 곳. 
            horizontal
         />

<Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20 ,marginBottom: 10}}>방문 인증</Text>
        <FlatList
        style={{marginLeft: 10, marginRight: 10}}
            data={data1}
            renderItem={renderItem1}
            horizontal
         />
        
    </SafeAreaView>
    );
};

