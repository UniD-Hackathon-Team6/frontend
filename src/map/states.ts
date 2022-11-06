import { atom } from 'recoil';

export const selectedDataState = atom({
    key: 'selectedDataState',
    default: {
        "category": "string",
        "sub_category": "string",
        "name": "string",
        "level": 0,
        "exp": 0,
        "latitude": 0,
        "longitude": 0,
        "id": 0
    }
})

export const currentPositionState = atom<{ latitude: number, longitude: number }>({
    key: 'currentPositionState',
    default: { latitude: 37.555465, longitude: 126.9737467 }
})

export const markersState = atom<{
    "category": string,
    "sub_category": string,
    "name": string,
    "level": number,
    "exp": number,
    "latitude": number,
    "longitude": number,
    "id": 0
}[]>({
    key: 'markersState',
    default: [{
        "category": "카테고리",
        "sub_category": "서브카테고리",
        "name": "장소명",
        "level": 0,
        "exp": 0,
        "latitude": 37.555,
        "longitude": 126.973,
        "id": 0
    }]
})

export const mapLoadingState = atom<boolean>({
    key: "mapLoadingState",
    default: true,
})