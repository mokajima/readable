import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// action
import { handleEditComment } from '../actions/comments'

// util
import { getTimestamp } from '../utils/helpers'

// view
import EditComment from '../components/EditComment'

const EditCommentContainer = () => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const { id } = useParams()

  const comment = comments[id]

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({
    author: comment.author,
    body: comment.body
  })

  const disabled = useMemo(() => {
    const { author, body } = values
    return author.trim() === '' || body.trim() === ''
  }, [values])

  const handleChange = (targetName, newValue) => {
    setValues(v => ({ ...v, [targetName]: newValue }))
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    const newComment = {
      ...comment,
      ...values,
      timestamp: getTimestamp()
    }

    dispatch(handleEditComment(newComment))
  }

  return (
    <EditComment
      disabled={disabled}
      isSubmitted={isSubmitted}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditCommentContainer
