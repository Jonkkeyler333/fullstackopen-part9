import { useState, useEffect } from "react";
import DiariesList from "./components/DiariesList";
import DiaryForm from "./components/DiaryForm"
import axios from "axios"
import diaryService from "./service/diaryService"
import type{ Diary } from "./types"

const App = () => {
    const [showDiaryForm, setShowDiaryForm] = useState<boolean>(false) 
    const [diaries, setDiaries] = useState<Diary[]>([])

    useEffect(() => {
        diaryService.getAllDiaries()
          .then(data => setDiaries(data))
          .catch((error) => {
            if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
          }})
    }, [])

    const setNewDiary = (newDiary: Diary) => {
        setDiaries(diaries.concat(newDiary))
    }

    return (
        <div>
            <button onClick={() => setShowDiaryForm(!showDiaryForm)}>{showDiaryForm? 'Cancel' : 'New Diary Entry'}</button>
            {showDiaryForm && <DiaryForm onEntrySubmit={setNewDiary}/>}
            <DiariesList diaries={diaries}/>
        </div>
    )
}

export default App