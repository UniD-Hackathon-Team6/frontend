import React from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function CommunityScreen() {
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
        data={[
          {
            title: 'This is title',
            address: '서울특별시 송파구 블라블라',
            image: '1',
            nickname: 'a',
            likes: 30,
            content:
              'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla',
            created_at: Date(),
          },
        ]}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 20,
            }}>
            <Image source={{uri: item.image}} style={{marginRight: 40}} />
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
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
                  }}>
                  <Image style={{marginRight: 12}} />
                  <Text
                    style={{
                      fontSize: 20,
                      paddingRight: 12,
                      textAlign: 'right',
                      paddingVertical: 6,
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
