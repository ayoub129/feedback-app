import { useState , useContext ,useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"


const RatingSelect = ({select}) => {
    const {feedbackEdit} = useContext(FeedbackContext)
    const [ selected , setSelected ] = useState(10)


    const handleChange = (e) => {
        setSelected(+e.currentTarget.value)
        select(+e.currentTarget.value)
    }

    useEffect(() => {
      if(feedbackEdit.edit === true) {
        setSelected(feedbackEdit.item.rating)
      }
  } , [feedbackEdit])

    return (
        <ul className='rating'>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={`rating-${i + 1}`}>
            <input
              type='radio'
              id={`num${i + 1}`}
              name='rating'
              value={i + 1}
              onChange={handleChange}
              checked={selected === i + 1}
            />
            <label htmlFor={`num${i + 1}`}>{i + 1}</label>
          </li>
        ))}
      </ul>
    )
}

export default RatingSelect