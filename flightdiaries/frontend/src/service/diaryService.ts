import type { Diary, NewDiary } from "../types"
import axios from "axios"

const baseUrl = "/api/diaries"

const getAllDiaries = async (): Promise<Diary[]> => {
    const response = await axios.get<Diary[]>(baseUrl)
    return response.data
}

const getDiaryById = async (id: number): Promise<Diary> => {
    if (!id) {
        throw new Error('You must send the resource ID');
    }
    const response = await axios.get<Diary>(`${baseUrl}/${id}`)
    return response.data
}

const addDiary = async (newDiary: NewDiary): Promise<Diary> => {
    const response = await axios.post(baseUrl, newDiary)
    return response.data
}

export default {
    getAllDiaries,
    getDiaryById,
    addDiary
}