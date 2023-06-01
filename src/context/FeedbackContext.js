import { createContext , useState , useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [feedback , setFeedback] = useState([])
    const [feedbackEdit , setFeedbackEdit] = useState({
        item:{},
        edit: false
    })

    useEffect(() => {
        feetchFeedback()
    }, [])

    // fetch feedback
    const feetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setLoading(false)
    }

    // Delete Feedack
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you Sure you want to delete?')) {
            await fetch(`/feedback/${id}` , {method: 'DELETE'})
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }

    // Add Feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newFeedback),

        }) 

        const data = await response.json();

        setFeedback([data, ...feedback]);
    }

    // set feedback to updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // updatefeedback data
    const updateFeedback =  async(id , updItem) => 
    {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
          })
          const data = await response.json()

          // NOTE: no need to spread data and item
          setFeedback(feedback.map((item) => (item.id === id ? data : item)))
      
          // FIX: this fixes being able to add a feedback after editing
          setFeedbackEdit({
            item: {},
            edit: false,
          })  

          setFeedback(feedback.map((item) => item.id === id ? {...item , ...updItem} : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        loading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext