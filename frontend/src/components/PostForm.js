import React from 'react'
import PropTypes from 'prop-types'

const PostForm = ({
  categories,
  values,
  handleChange,
  handleSubmit
}) => (
  <>
    <table className="table">
      <tbody>
        <tr>
          <th>Title</th>
          <td>
            <input
              className="input"
              type="text"
              value={values.title}
              required
              onChange={e => handleChange('title', e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Body</th>
          <td>
            <textarea
              className="input"
              value={values.body}
              required
              onChange={e => handleChange('body', e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Category</th>
          <td>
            <select
              className="select"
              value={values.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th>Author</th>
          <td>
            <input
              className="input"
              type="text"
              value={values.author}
              required
              onChange={e => handleChange('author', e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button className="button" onClick={handleSubmit}>
      Submit
    </button>
  </>
)

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default PostForm
