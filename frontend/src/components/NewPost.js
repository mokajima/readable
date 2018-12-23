import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import { getId, getTimestamp } from '../utils/helpers'

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react'
  }

  isDisabled = () => {
    const { title, body, author, category } = this.state

    return '' === title.trim() || '' === body.trim() || '' === author.trim() || '' === category
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
    const { title, body, author, category } = this.state
    const id = getId()

    this.props.dispatch(addPost({
      [id]: {
        id,
        timestamp: getTimestamp(),
        title: title.trim(),
        body: body.trim(),
        author: author.trim(),
        category,
        voteScore: 0,
        deleted: false,
        commentCount: 0
      }
    }))
  }

  render() {
    const { categories } = this.props
    const { title, body, author, category } = this.state

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Body</th>
              <td>
                <textarea
                  name="body"
                  value={body}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>
                <select
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>Author</th>
              <td>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleSubmit} disabled={this.isDisabled()}>Submit</button>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(NewPost)
