import { v4 as uuidv4 } from "uuid"
import { createContext , useState } from "react";
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback , setFeedback] = useState(FeedbackData)

    const [feedbackEdit , setFeedbackEdit] = useState({
        item:{},
        edit: false
    })

    // Delete Feedack
    const deleteFeedback = (id) => {
        if(window.confirm('Are you Sure you want to delete?')) {
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }

    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback]);
    }

    // set feedback to updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // updatefeedback data
    const updateFeedback = (id , updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item , ...updItem} : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext