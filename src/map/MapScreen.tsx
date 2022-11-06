import React, { useEffect, useRef, useState } from "react";
import { Alert, PermissionsAndroid, SafeAreaView } from "react-native";
import NaverMapView, { Circle, Marker } from "react-native-nmap";
import MapBottomSheet from "./MapBottomSheet";
import axios from 'axios';
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPositionState, mapLoadingState, markersState, selectedDataState } from "./states";

export default function MapScreen() {
    const ref = useRef<NaverMapView>(null);
    const currentPosition = useRecoilValue(currentPositionState);
    const [markers, setMarkers] = useRecoilState(markersState);
    const [zoom, setZoom] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useRecoilState(selectedDataState);
    const loading = useRecoilValue(mapLoadingState);

    // useEffect(() => {
    //     console.log('asdf', currentPosition)
    //     axios.get('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/places',
    //         { params: { latitude: currentPosition.longitude, longitude: currentPosition.latitude } })
    //         .then(res => {
    //             console.log(res.data);
    //             setMarkers(res.data);
    //             setLoading(false);
    //         })
    // }, [])

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