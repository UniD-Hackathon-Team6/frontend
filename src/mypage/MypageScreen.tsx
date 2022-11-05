import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet , Image, FlatList } from "react-native";
import Swiper from 'react-native-swiper';

export default function MypageScreen() {

    const data0 = [
       {
            image: 'https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png'
       } 
    ]
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

    const data2 = [
        {
            text: '고기 구워 먹기',
            image: 'https://images.pexels.com/photos/12081656/pexels-photo-12081656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            text: '지하상가 쇼핑가기',
            image: 'https://previews.123rf.com/images/seaonweb/seaonweb1801/seaonweb180102249/94278115-%EC%9D%BC%EB%B3%B8-%EA%B5%90%ED%86%A0%EC%9D%98-%EC%A7%80%ED%95%98-%EC%83%81%EA%B0%80.jpg',
        },
        {
            text: '공연 보러 가기',
            image: 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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

    const renderItem2 = ({item}) => {
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
            <Image style={{borderRadius:40, width: 80, height: 80, margin: 20}} source={{uri:'https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png'}} />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>혼자 놀기의 달인</Text>
                <Text style={{textAlign: 'center', fontSize: 18, color: '#FFCB77', fontWeight: 'bold'}}>Lv. 2</Text>
            </View>
        </View>
        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 20, marginBottom: 10}}>도전 완료⩗</Text>
        <FlatList
        style={{marginLeft: 10, marginRight: 10}}
            data={data1}
            renderItem={renderItem1}
            horizontal
         />

        <Text style={{fontSize: 16, fontWeight: '700', marginLeft: 20, marginBottom: 10}}>다음 도전</Text>
        <FlatList
        style={{marginLeft: 10, marginRight: 10}}
            data={data2}
            renderItem={renderItem2}
            horizontal
         />
        
    </SafeAreaView>
    );
};

