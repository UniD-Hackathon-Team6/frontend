import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { LEVEL_COLOR } from "./MapCertScreen";
import { selectedDataState } from "./states";

export interface MapBottomSheetProps {
    visible: boolean,
    setVisible: (v: boolean) => void,
}

export default function MapBottomSheet({ visible, setVisible }: MapBottomSheetProps) {
    const navi = useNavigation();
    const data = useRecoilValue(selectedDataState);

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View
                        style={{
                            backgroundColor: '#FFF',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            height: 250,
                            elevation: 15,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 30,
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E1E1E' }}>{data.name}</Text>
                            <Text style={{ fontSize: 12, color: '#D8D8D8', marginTop: 5 }}>{data.category + '  |  ' + data.sub_category}</Text>
                        </View>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: LEVEL_COLOR[Math.min(data.level, LEVEL_COLOR.length) - 1] }}>{'Lv. ' + data.level}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#0496FF', borderRadius: 20, width: '85%', justifyContent: 'center' }}
                            onPress={() => {
                                axios.post('http://ec2-13-124-212-12.ap-northeast-2.compute.amazonaws.com:8000/stamps', {
                                    "user_id": 0,
                                    "place_id": data.id,
                                })
                                setVisible(false);
                                navi.navigate('MapCertScreen')
                            }}>
                            <Text style={{ color: '#FFF', textAlign: 'center', paddingVertical: 12, fontWeight: 'bold', }}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
}