import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleEditPost } from '../actions/posts'
import { getTimestamp } from '../utils/helpers'
import EditPost from '../components/EditPost'

const EditPostContainer = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const posts = useSelector(state => state.posts)
  const { id } = useParams()

  const post = posts[id]

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  })

  const disabled = useMemo(() => {
    const { title, body, author } = values
    return title.trim() === "" || body.trim() === "" || author.trim() === ""
  }, [values])

  const handleChange = (targetName, newValue) => {
    setIsSubmitted(false)
    setValues(v => ({ ...v, [targetName]: newValue }))
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    const newPost = {
      ...post,
      ...values,
      timestamp: getTimestamp()
    }

    dispatch(handleEditPost(newPost))
  }

  return (
    <EditPost
      categories={categories}
      disabled={disabled}
      isSubmitted={isSubmitted}
      values={values}
      post={post}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditPostContainer
