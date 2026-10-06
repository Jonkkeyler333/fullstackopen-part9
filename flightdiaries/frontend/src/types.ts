export interface Diary{
    id: number;
    weather: string
    visibility: string,
    date: string
    comment?: string
}

export interface DiaryFormProps {
  onEntrySubmit: (newDiary: Diary) => void;
}

export type NewDiary = Omit<Diary, "id">;