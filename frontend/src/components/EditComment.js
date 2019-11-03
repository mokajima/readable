import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const EditComment = ({
  disabled,
  isSubmitted,
  values,
  handleChange,
  handleSubmit
}) => (
  <>
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
  </>
)

EditComment.propTypes = {
  disabled: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default EditComment
