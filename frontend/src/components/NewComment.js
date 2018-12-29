import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleAddComment } from '../actions/shared'
import { getId, getTimestamp } from '../utils/helpers'

class NewComment extends Component {
  state = {
    author: '',
    body: ''
  }

  /**
   * @description Update the state
   * @params {object} - The event object
   */
  handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  /**
   * @description Add a comment to a post
   */
  handleSubmit = () => {
    const { parentId } = this.props
    const { author, body } = this.state
    const id = getId()

    const comment = {
      id,
      parentId,
      timestamp: getTimestamp(),
      body: body.trim(),
      author: author.trim(),
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    this.props.dispatch(handleAddComment(comment))

    this.setState({
      author: '',
      body: ''
    })
  }

  render() {
    const { author, body } = this.state

    return (
      <div>
        <table className="table">
          <caption className="table__caption">Create a comment</caption>
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
          disabled={'' === author.trim() || '' === body.trim()}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

NewComment.propTypes = {
  parentId: PropTypes.string.isRequired,
  dispatch: PropTypes.func
}

export default connect()(NewComment)
