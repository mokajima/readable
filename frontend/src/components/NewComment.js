import React from 'react'
import PropTypes from 'prop-types'

const NewComment = ({ disabled, values, handleChange, handleSubmit }) => (
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
              value={values.author}
              onChange={e => handleChange('author', e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Body</th>
          <td>
            <textarea
              className="input"
              value={values.body}
              onChange={e => handleChange('body', e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button
      className="button"
      disabled={disabled}
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
)

NewComment.propTypes = {
  disabled: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewComment
