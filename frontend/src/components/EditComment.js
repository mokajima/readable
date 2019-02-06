import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { getTimestamp } from '../utils/helpers'

class EditComment extends Component {
  state = {
    author: this.props.comment.author,
    body: this.props.comment.body,
    isSubmitted: false
  }

  /**
   * @description Whether or not all form fields are filled
   * @returns {bool}
   */
  isDisabled = () => {
    const { author, body } = this.state

    return '' === author.trim() || '' === body.trim()
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
   * @description Save an edited comment
   */
  handleSubmit = () => {
    const { id, parentId, voteScore, deleted, parentDeleted } = this.props.comment
    const { author, body } = this.state

    const comment = {
      id,
      parentId,
      timestamp: getTimestamp(),
      body: body.trim(),
      author: author.trim(),
      voteScore,
      deleted,
      parentDeleted
    }

    this.props.editComment(comment)

    this.setState({
      isSubmitted: true
    })
  }

  render() {
    const { author, body, isSubmitted } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>Edit Comment | Readable</title>
        </Helmet>
        {isSubmitted && (
          <p>Comment updated!</p>
        )}
        <table className="table">
          <tbody>
            <tr>
              <th>Author</th>
              <td>
                <input
                  className="input"
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Body</th>
              <td>
                <textarea
                  className="input"
                  name="body"
                  value={body}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="button"
          disabled={this.isDisabled()}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </Fragment>
    )
  }
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  editComment: PropTypes.func.isRequired
}

export default EditComment
