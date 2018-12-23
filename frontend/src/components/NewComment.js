import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'
import { addChildComment } from '../actions/posts'
import { getId } from '../utils/helpers'

class NewComment extends Component {
  state = {
    author: '',
    body: ''
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
    const { parentId } = this.props
    const { author, body } = this.state
    const id = getId()

    this.props.dispatch(addComment({
      [id]: {
        id,
        parentId,
        timestamp: new Date().getTime(),
        body: body.trim(),
        author: author.trim(),
        voteScore: 0,
        deleted: false,
        parentDeleted: false
      }
    }))

    this.props.dispatch(addChildComment(parentId))

    this.setState({
      author: '',
      body: ''
    })
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

export default connect()(NewComment)
