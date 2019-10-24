import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PostForm from '../components/PostForm'

const NewPost = ({
  categories,
  values,
  handleChange,
  handleSubmit
}) => (
  <>
    <Helmet>
      <title>Add New Post | Readable</title>
    </Helmet>
    <PostForm
      categories={categories}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  </>
)

NewPost.propTypes = {
  categories: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewPost
