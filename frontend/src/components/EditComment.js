import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleEditComment } from '../actions/comments'
import { getTimestamp } from '../utils/helpers'

class EditComment extends Component {
  state = {
    author: this.props.comment.author,
    body: this.props.comment.body
  }

  handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

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
  }

  render() {
    const { author, body } = this.state

    return (
      <div>
        <input
          type="text"
          name="author"
          value={author}
          onChange={this.handleChange}
        />
        <textarea
          name="body"
          value={body}
          onChange={this.handleChange}
        />
        <button
          disabled={'' === author.trim() || '' === body.trim()}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
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
