import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { getTimestamp } from '../utils/helpers'
import PostForm from '../containers/PostForm'

class EditPost extends Component {
  state = {
    title: this.props.post.title,
    body: this.props.post.body,
    author: this.props.post.author,
    category: this.props.post.category,
    isSubmitted: false
  }

  /**
   * @description Whether or not all form fields are filled
   * @returns {bool}
   */
  isDisabled = () => {
    const { title, body, author, category } = this.state

    return '' === title.trim() || '' === body.trim() || '' === author.trim() || '' === category
  }

  /**
   * @description Update the state
   * @param {object} e - The event object
   */
  handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value,
      isSubmitted: false
    })
  }

  /**
   * @description Save an edited post
   */
  handleSubmit = () => {
    const { id, voteScore, deleted, commentCount } = this.props.post
    const { title, body, author, category } = this.state

    const post = {
      id,
      timestamp: getTimestamp(),
      title: title.trim(),
      body: body.trim(),
      author: author.trim(),
      category,
      voteScore,
      deleted,
      commentCount
    }

    this.props.editPost(post)

    this.setState({
      isSubmitted: true
    })
  }

  render() {
    const { title, body, author, category, isSubmitted } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>Edit Post | Readable</title>
        </Helmet>
        {isSubmitted && (
          <p>Post updated!</p>
        )}
        <PostForm
          title={title}
          body={body}
          author={author}
          category={category}
          isDisabled={this.isDisabled}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired
}

export default EditPost
