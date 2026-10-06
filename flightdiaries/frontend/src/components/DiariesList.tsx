import DiaryElement from '../components/Diary'
import type { Diary } from '../types'


const DiariesList = ({ diaries } : { diaries: Diary[]}) => {
    
    return (
      <div>
        <h1>Diary Entries</h1>
        {diaries.length !== 0 ? (
          <ul>
            {diaries.map(diary => (
                <DiaryElement key={diary.id} diary={diary}/>
            ))}
          </ul>)
           : <p>Any diaries yet</p>
        }
      </div>
    )

}

export default DiariesList