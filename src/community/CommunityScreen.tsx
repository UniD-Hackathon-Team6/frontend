// <<<<<<< feat-13
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

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FlatList, Image, SafeAreaView, Text, TextInput, View } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { useRecoilValue } from 'recoil';
// import { postListDataState } from './states';

export type BoardData = {
  "user_id": number,
  "place_id": number,
  "title": string,
  "image": string,
  "content": string,
  "created_at": string,
  "updated_at": string,
  "id": number,
}

export default function CommunityScreen() {
  const data = useRecoilValue(postListDataState);

  const renderItem = ({ item }: { item: BoardData }) => (
    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderColor: '#E9E9E9' }}>
      <Text style={{ fontSize: 20, color: '#1E1E1E', marginLeft: 10, marginBottom: 10 }}>{item.title}</Text>
      <Image style={{ width: '100%', height: 180, }} source={{ uri: item.image }}
        defaultSource={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMVFRUVFRcXFxcVGBgXFRcVFRUXFxcVFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDysZFRktLSsrKysrLTc3KzcrLSstLSsrNzctNzc3Ny0tNys3Ny0rLS03KzctNzc3LSstLS03Lf/AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJhABAQEAAAQFBAMAAAAAAAAAAAERAiFh8BIxQVHBobHR8XGBkf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A4xUWswYW1FQADAWJSUoC2CWgGkQVQhRCotQUWJQFol5KChgICWqCYqwsA0hhAAAZUAEXUBFABQgJQAEUFABChxIKVYaCBBRVgiiCYlUFhQtAIYaC6JoCIqApq1AQKaApDQECgYSJgK0gtEShUFXFzkhoi1BYBKLEAA0BUAWgoJy7xVz+VBjWVKCoGghgUACAIpQRUUUioAUC0C0iaoAoIAUEpi4mAukiyACpFnfUDl7KxgAUxAUNUGSKgEhhpgLqUAII1ATWqyaBUa1BUUURFSLQBqM2gBpQFtSKBpI14WbQPFVTw98gCVMIlgCpFoIACKmLBSglAVNWAUJFETEqpAWAsAioQCwq1KCQFAxYmkoNaza1EoM6LnfdUEiWLCgiosoEqGoAqasAWxNWgkiyJiwFgJQNKyoGrEIiqsQVFSwpgBUUBUqwFiLYmUDRM6BQOI0AkVmLoJErTNgKQ0gLogAGgLAhQQACVeogNWVDVAQAEq4AjUTAFMWRATA5e8/wBBSggQBcRUBMa1MMBZCoUEWVK1KKRcSAhai4YCSkMXAXRCAst79wsQE0qgCxAFpUiwEDb1ARUAAAVKUBFCAJY0gIsMBVEURLVnpzzvpzSgEqxmNQDFiAGi1nAUpIUANICwlQBc6CAItEAVMXAKi4gIpSUFQ0BFRoDCqmAgACxJFwDVSRQQEwAUgEAwFkTdFBBrwzv9gM6hpoFAwFRalAtEigaULQTGozjUFDUgIigKpiRbRFEUBDV0GYoAtJTixICxKqAb3qpgCUtCAKEAqKUEtEqyAtiU0tBMaiasASqgGgABFAVFAiKgAAKkVMBdSqkgKADOCFBYBAWoqACYCgqALEaBIUKIYimCmqkBFppFoIGAFNAAFARZUwDev3ABEvygDUJ39ABq/n7s8XoAF+EnkANRADCr6gBxJQBanuALPwABPT+1ACpxACcPy1PKgKxFAFvkkARQBX/9k=' }} />
      <Text style={{ marginLeft: 10, paddingTop: 10 }}>{item.content}</Text>
      <Text style={{ fontSize: 12, color: '#959595', marginRight: 10, paddingBottom: 10, textAlign: 'right' }}>{item.created_at}</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row', backgroundColor: '#DFDFDF',
        alignItems: 'center',
        margin: 20, borderRadius: 20, paddingHorizontal: 20,
        justifyContent: 'space-between'
      }}>
        <TextInput placeholder='검색어를 입력하세요.' />
        <Feather name="search" size={20} color='' />
      </View>
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
    </SafeAreaView>
  );
}
