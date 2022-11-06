import React, { useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, PermissionsAndroid, Alert, TouchableOpacity, ScrollView } from "react-native";
import NaverMapView, { Circle, Marker } from "react-native-nmap";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPositionState, mapLoadingState, markersState } from "../map/states";
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { postListDataState } from "../community/states";
import { BoardData } from "../community/CommunityScreen";



export default function MypageScreen() {
    const [currentPosition, setCurrentPosition] = useRecoilState(currentPositionState);
    const [markers, setMarkers] = useRecoilState(markersState);
    const navi = useNavigation();
    const [data, setData] = useRecoilState(postListDataState);
    const [mapLoading, setMapLoading] = useRecoilState(mapLoadingState);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                Alert.alert('권한 수정', '현재 위치를 표시하려면 설정에서 권한을 허용해주세요.');
                return false;
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        let intervalId = 0
        requestLocationPermission()
            .then(res => {
                if (res) {
                    intervalId = setInterval(() => {
                        Geolocation.getCurrentPosition((position) => {
                            setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                        }, () => console.error('err'), { timeout: 10000 })
                    }, 5000);
                }
            })

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        // setData([{
        //     "user_id": 0,
        //     "place_id": 0,
        //     "title": "string",
        //     "image": "https://blog.kakaocdn.net/dn/DOfYu/btrN9r2Wlpw/24jRiG9ZK1gkZcfBPD1rs0/img.png",
        //     "content": "string",
        //     "created_at": "2022-11-05",
        //     "updated_at": "2022-11-05",
        //     "id": 0
        // }, {
        //     "user_id": 0,
        //     "place_id": 0,
        //     "title": "string",
        //     "image": "https://blog.kakaocdn.net/dn/DOfYu/btrN9r2Wlpw/24jRiG9ZK1gkZcfBPD1rs0/img.png",
        //     "content": "string",
        //     "created_at": "2022-11-05",
        //     "updated_at": "2022-11-05",
        //     "id": 1
        // }, {
        //     "user_id": 0,
        //     "place_id": 0,
        //     "title": "string",
        //     "image": "https://blog.kakaocdn.net/dn/DOfYu/btrN9r2Wlpw/24jRiG9ZK1gkZcfBPD1rs0/img.png",
        //     "content": "string",
        //     "created_at": "2022-11-05",
        //     "updated_at": "2022-11-05",
        //     "id": 2
        // }])
        axios.get('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/boards')
            .then(res => { console.log(res.data); setData(res.data) })
            .catch(err => console.error(err))

        axios.get('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/places',
            { params: { latitude: currentPosition.longitude, longitude: currentPosition.latitude } })
            .then(res => {
                console.log(res.data);
                setMarkers(res.data);
                setMapLoading(false);
            })
    }, [])

    const renderItem1 = ({ item }: { item: BoardData }) => {
        return <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={1} onPress={() => navi.navigate('CommunityScreen')}>
            <Image
                source={{ uri: item.image }}
                style={{ width: 150, height: 200, borderRadius: 5 }}
            />
            <Text style={{ color: '#1E1E1E', padding: 3 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, width: 150, paddingHorizontal: 3 }} numberOfLines={2}>{item.content}</Text>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' }}>
                <Text style={{ textAlign: 'left', fontSize: 22, fontWeight: "bold", color: '#1E1E1E' }}>앱 이름</Text>
                <Ionicons name="notifications-outline" size={25} color="#1E1E1E" />
            </View>
            <ScrollView>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, color: '#1E1E1E', marginTop: 10 }}>내 주변</Text>
                <View style={{ marginHorizontal: 20, height: 250 }}>
                    {mapLoading ? undefined : <NaverMapView
                        style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                        center={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude, zoom: 15 }}
                    >
                        <Circle coordinate={currentPosition} color="red" radius={14} />
                        {markers.map((v) => <Marker
                            coordinate={{ latitude: v.longitude, longitude: v.latitude }}
                            pinColor="blue" />)}
                    </NaverMapView>}
                    <TouchableOpacity style={{ position: 'absolute', width: '100%', height: '100%' }}
                        onPress={() => navi.navigate('MapScreen')} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: '#1E1E1E', marginVertical: 20, }}>방문 인증</Text>
                    <TouchableOpacity style={{ marginRight: 30 }} onPress={() => navi.navigate('CommunityScreen')}>
                        <Text style={{ fontSize: 12 }}>{"더보기 >"}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginLeft: 20, marginRight: 20 }}
                    data={data}
                    renderItem={renderItem1}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

