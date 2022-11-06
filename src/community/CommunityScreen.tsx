import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TextInput, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useRecoilValue } from 'recoil';
import { postListDataState } from './states';

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
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
