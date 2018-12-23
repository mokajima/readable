import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function PostForm(props){
  const {
    categories,
    title,
    body,
    author,
    category,
    isDisabled,
    handleChange,
    handleSubmit
  } = props

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
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Body</th>
            <td>
              <textarea
                name="body"
                value={body}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <th>Category</th>
            <td>
              <select
                name="category"
                value={category}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit} disabled={isDisabled()}>Submit</button>
    </div>
  )
}

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isDisabled: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(PostForm)
