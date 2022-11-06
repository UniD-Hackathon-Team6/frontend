import { atom } from "recoil";
import { BoardData } from "./CommunityScreen";

export const postListDataState = atom<BoardData[]>({
    key: 'postListDataState',
    default: [],
})