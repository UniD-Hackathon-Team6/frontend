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