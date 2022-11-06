import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

export default function CommunityScreen() {
  const [boards, setBoards] = useState([]);
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
    fetchBoards();
  }, []);
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          backgroundColor: '#0496FF',
          paddingVertical: 10,
          color: 'white',
          textAlign: 'center',
        }}>
        게시판
      </Text>
      <FlatList
        data={boards}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 20,
            }}>
            <Image
              source={{uri: item.image}}
              style={{marginRight: 20, width: 100, height: 100}}
            />
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: 250,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{marginRight: 8, marginBottom: 12}}>
                  <Text style={{fontSize: 20}}>{item.title}</Text>
                  <Text style={{fontSize: 12}}>{item.address}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 8,
                    width: 72,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 10,
                      marginRight: 16,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'right',
                    }}>
                    {item.likes}
                  </Text>
                </View>
              </View>
              <Text style={{maxWidth: 200, overflow: 'hidden', fontSize: 12}}>
                {item.content}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
