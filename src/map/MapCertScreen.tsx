import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { selectedDataState } from "./states";
import { launchImageLibrary } from 'react-native-image-picker';

export const LEVEL_COLOR = ['#D76A03', '#F5BB00', '#0E6BA8', '#540D6E', '#90ee90', '#EA3354'];

export default function MapCertScreen() {
    const navi = useNavigation();
    const [uploadLoading, setUploadLoading] = useState(false);
    const data = useRecoilValue(selectedDataState);
    const [text, setText] = useState('');
    const [imageList, setImageList] = useState<{ uri: string, name: string, type: string }[]>([]);

    const uploadImage = async () => {
        if (imageList.length >= 10) {
            Alert.alert('확인', '사진은 10장까지 첨부할 수 있습니다.');
            return;
        }
        launchImageLibrary({ selectionLimit: 10 - imageList.length, mediaType: "photo" }, (res: any) => {
            if (res.assets) {
                const imgs = Array.from((res.assets as Array<any>), (img) => {
                    return {
                        uri: Platform.OS === "android"
                            ? img.uri
                            : img.uri.replace("file://", ""),
                        name: img.fileName,
                        type: img.type,
                    }
                });
                setImageList(prev => [...prev].concat([...imgs]));
            }
        });
    };

    const upload = () => {
        console.log(imageList, data.id, data.name, text);
        const formData = new FormData();
        formData.append("user_id", 0);
        formData.append("place_id", data.id);
        formData.append("title", data.name);
        imageList.map(v => formData.append("image", v));
        formData.append("content", text);
        setUploadLoading(true);
        axios.post('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/boards', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                console.log(res);
                setUploadLoading(false);
                navi.replace('CertCompletionScreen');
            })
            .catch(err => {
                console.error(err);
                setUploadLoading(false);
            })
    }

    const onPressButton = () => {
        upload();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <TouchableOpacity style={{ flex: 1, }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navi.goBack()}>
                            <Entypo name="chevron-small-left" size={24} color='#1E1E1E' />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, fontSize: 15, color: '#1E1E1E', fontWeight: '700' }}>방문 인증</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 30, width: '100%', justifyContent: 'space-between' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' }}>{data.name}</Text>
                            <Text style={{ fontSize: 12, color: '#D8D8D8', marginTop: 5 }}>{data.category + '  |  ' + data.sub_category}</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: LEVEL_COLOR[Math.min(data.level, LEVEL_COLOR.length) - 1] }}>{'Lv. ' + data.level}</Text>
                    </View>
                    <TextInput value={text} onChangeText={setText} style={{ borderWidth: 1, borderColor: '#D9D9D9', marginHorizontal: 30, borderRadius: 10, minHeight: 200, textAlignVertical: 'top', padding: 15, }}
                        multiline />
                    <TouchableOpacity onPress={uploadImage} style={{ alignSelf: 'flex-end', marginRight: 30, marginTop: 15, }}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#959595', marginBottom: 10, }}>이미지 추가</Text>
                    </TouchableOpacity>
                    {imageList.map((v, i) => <Image key={i} style={{ width: '90%', height: 250, alignSelf: 'center' }} source={{ uri: v.uri }} />)}
                </ScrollView>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navi.goBack()}>
                        <Text style={{ fontSize: 12 }}>건너뛰기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#0496FF', borderRadius: 20, justifyContent: 'center', flex: 1, marginLeft: 30 }}
                        onPress={onPressButton}>
                        <Text style={{ color: '#FFF', textAlign: 'center', paddingVertical: 12, fontWeight: 'bold', }}>완료</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <ActivityIndicator style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#0004', display: uploadLoading ? 'flex' : 'none' }} size='large' />
        </SafeAreaView>
    )
}