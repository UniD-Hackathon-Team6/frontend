import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';

export default function MypageScreen() {
  const [user, setUser] = useState({});
  const [boards, setBoards] = useState([]);

  const fetchUser = async () => {
    try {
      const u = await axios.get(
        'http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/users',
        {
          headers: {
            accept: 'application/json',
            'access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1Mzg2MDE4MzksInN1YiI6Imp5bnNAbmF2ZXIuY29tIn0.FXALp6EHUgEjdbL5rkjYX-Sz6I0Hf5ph-9KVXVduEG0',
          },
        },
      );
      setUser(u.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBoards = async () => {
    try {
      const b = await axios.get(
        'http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/boards?user_id=1',
        {
          headers: {
            accept: 'application/json',
            'access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1Mzg2MDE4MzksInN1YiI6Imp5bnNAbmF2ZXIuY29tIn0.FXALp6EHUgEjdbL5rkjYX-Sz6I0Hf5ph-9KVXVduEG0',
          },
        },
      );
      setBoards(b.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBoards();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{marginRight: 10}}>
        <Text>{item.title}</Text>
        <Image source={{uri: item.image}} style={{width: 150, height: 150}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 150,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{borderRadius: 40, width: 80, height: 80, margin: 20}}
          source={{
            uri: 'https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png',
          }}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            혼자 놀기의 달인
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: '#FFCB77',
              fontWeight: 'bold',
            }}>
            Lv. {user.level}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginLeft: 20,
          marginBottom: 10,
        }}>
        도전 완료⩗
      </Text>
      <FlatList
        style={{marginLeft: 10, marginRight: 10}}
        data={boards}
        renderItem={renderItem}
        horizontal
      />

      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginLeft: 20,
          marginBottom: 10,
        }}>
        다음 도전
      </Text>
      <FlatList
        style={{marginLeft: 10, marginRight: 10}}
        data={boards.sort()}
        renderItem={renderItem}
        horizontal
      />
    </SafeAreaView>
  );
}
