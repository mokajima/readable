import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// view
import PostForm from '../components/PostForm'

const EditPost = ({
  categories,
  disabled,
  isSubmitted,
  values,
  handleChange,
  handleSubmit
}) => (
  <>
    <Helmet>
      <title>Edit Post</title>
    </Helmet>
    {isSubmitted && (
      <p>Post updated!</p>
    )}
    <PostForm
      categories={categories}
      disabled={disabled}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  </>
)

EditPost.propTypes = {
  categories: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default EditPost
