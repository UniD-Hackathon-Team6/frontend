import React, { useEffect, useRef, useState } from "react";
import { Alert, PermissionsAndroid, SafeAreaView } from "react-native";
import NaverMapView, { Circle, Marker } from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';
import MapBottomSheet from "./MapBottomSheet";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { selectedDataState } from "./states";

export default function MapScreen() {
    const ref = useRef<NaverMapView>(null);
    const [currentPosition, setCurrentPosition] = useState({ latitude: 37.555465, longitude: 126.9737467 });
    const [markers, setMarkers] = useState([{
        "category": "카테고리",
        "sub_category": "서브카테고리",
        "name": "장소명",
        "level": 0,
        "exp": 0,
        "latitude": 37.555,
        "longitude": 126.973,
        "id": 0
    }]);
    const [zoom, setZoom] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useRecoilState(selectedDataState);
    const [loading, setLoading] = useState(true);

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
        console.log('asdf', currentPosition)
        axios.get('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/places',
            { params: { latitude: currentPosition.longitude, longitude: currentPosition.latitude } })
            .then(res => {
                console.log(res.data);
                setMarkers(res.data);
                setLoading(false);
            })
    }, [])

    return (
        <SafeAreaView>
            {loading ? undefined : <NaverMapView
                style={{ width: '100%', height: '100%' }}
                center={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude, zoom: 16 }}
                ref={ref}
                onCameraChange={e => (e.zoom != zoom) && setZoom(e.zoom)}
            >
                <Circle coordinate={currentPosition} color="red" radius={Math.pow(2, 19) / Math.pow(2, zoom)} />
                {markers.map((v) => <Marker
                    coordinate={{ latitude: v.longitude, longitude: v.latitude }}
                    pinColor="blue"
                    onClick={() => { setSelectedData(v); setModalVisible(true) }} />)}
            </NaverMapView>}
            <MapBottomSheet
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </SafeAreaView>
    );
}