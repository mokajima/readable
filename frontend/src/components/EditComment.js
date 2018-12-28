import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleEditComment } from '../actions/comments'
import { getTimestamp } from '../utils/helpers'

class EditComment extends Component {
  state = {
    author: this.props.comment.author,
    body: this.props.comment.body,
    isSubmitted: false
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

    this.props.dispatch(handleEditComment(comment))

    this.setState({
      isSubmitted: true
    })
  }

  render() {
    const { author, body, isSubmitted } = this.state

    return (
      <Fragment>
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
          disabled={'' === author.trim() || '' === body.trim()}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </Fragment>
    )
  }
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired
}

function mapStateToProps({ comments }, props) {
  const { id } = props.match.params

  return {
    comment: comments[id]
  }
}

export default connect(mapStateToProps)(EditComment)
