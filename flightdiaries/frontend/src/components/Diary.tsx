import { useState } from 'react';
import type{ Diary } from '../types'

const Diary = ({ diary }: { diary: Diary}) => {
    const [showComment, setShowComment] = useState<boolean>(false)
    
    const handleShowComment = () => {
        setShowComment(!showComment)
    }

    return (
        <li>
            <h4>{diary.date}</h4>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            {showComment && <p>Comment: {diary?.comment}</p>}
            <button onClick={handleShowComment}>{ showComment ? 'Hide Comment' : 'Show Comment'}</button>
        </li>
    )
}

export default Diary