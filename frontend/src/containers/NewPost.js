import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// action
import { handleAddPost } from 'actions/posts'

// util
import { getId, getTimestamp } from 'utils/helpers'

// view
import NewPost from 'components/NewPost'

const NewPostContainer = () => {
  const [values, setValues] = useState({
    title: '',
    body: '',
    author: '',
    category: 'react'
  })
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const history = useHistory()

  const disabled = useMemo(() => {
    const { title, body, author } = values
    return title.trim() === "" || body.trim() === "" || author.trim() === ""
  }, [values])

  const handleChange = (targetName, newValue) => {
    setValues(v => ({ ...v, [targetName]: newValue }))
  }

  const handleSubmit = () => {
    const post = {
      ...values,
      id: getId(),
      timestamp: getTimestamp(),
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    dispatch(handleAddPost(post))
    history.push(`/${post.category}/${post.id}`)
  }

  return (
    <NewPost
      categories={categories}
      disabled={disabled}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default NewPostContainer
