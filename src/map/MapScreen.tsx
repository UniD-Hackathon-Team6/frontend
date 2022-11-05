import { useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert, PermissionsAndroid, SafeAreaView } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

export default function MapScreen() {
    const ref = useRef<NaverMapView>(null);
    const [currentPosition, setCurrentPosition] = useState({ latitude: 37.555465, longitude: 126.9737467 });

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

    useFocusEffect(() => {
        let intervalId = 0
        requestLocationPermission()
            .then(res => {
                if (res) {
                    intervalId = setInterval(() => {
                        Geolocation.getCurrentPosition((position) => {
                            setCurrentPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                        }, () => console.error('err'), { timeout: 50000 })
                    }, 1000);
                }
            })

        return () => clearInterval(intervalId);
    })

    return (
        <SafeAreaView>
            <NaverMapView
                style={{ width: '100%', height: '100%' }}
                center={currentPosition}
                ref={ref}
            >
                <Circle coordinate={currentPosition} color="red" radius={20} onClick={() => console.warn('onClick! circle')} />
            </NaverMapView>
        </SafeAreaView>
    );
}