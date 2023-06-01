import {motion , AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from "./FeedbackItem"
import Spinner from './shared/Spinner'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
    const {feedback , loading} = useContext(FeedbackContext)

    if(!loading && (!feedback || feedback.length === 0) ) {
        return <p>No Feedback Yet</p>
    }

    return loading ? ( <Spinner /> ) : (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 , display: 'none'}}
                    >
                        <FeedbackItem item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default FeedbackList