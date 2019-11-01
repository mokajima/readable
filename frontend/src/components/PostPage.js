import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { formatDate } from '../utils/helpers'
import Comment from '../components/Comment'
import NewComment from '../components/NewComment'

const PostPage = ({
  comments,
  disabled,
  post,
  values,
  handleChange,
  handleSubmit,
  handleDeletePost,
  handleUpPostVote,
  handleDownPostVote,
  handleDeleteComment,
  handleUpCommentVote,
  handleDownCommentVote
}) => {
  if (!post) return null

  if (post.deleted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Oops, the page cannot be found X(</p>
        <Link className="button" to="/">Return to Home Page</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Readable</title>
      </Helmet>
      <article className="entry">
        <div className="entry__inner">
          <div>
            <header>
              <h1 className="entry__title">
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              </h1>
              <p className="entry__meta">
                <span className="post__author">{post.author}</span>
                <span className="post__date">{formatDate(post.timestamp)}</span>
              </p>
            </header>
            <p>{post.body}</p>
            <footer className="entry__footer">
              <FontAwesomeIcon icon={faComment} />
              <p className="entry__comment">{post.commentCount}</p>
              <Link className="entry__edit" to={`/edit/${post.id}`}>Edit</Link>
              <p className="entry__delete" onClick={handleDeletePost}>Delete</p>
            </footer>
          </div>
          <div className="entry__votes">
            <p className="arrow" onClick={handleUpPostVote}>
              <FontAwesomeIcon icon={faAngleUp} size="2x" />
            </p>
            <p>{post.voteScore}</p>
            <p className="arrow" onClick={handleDeletePost}>
              <FontAwesomeIcon icon={faAngleDown} size="2x" />
            </p>
          </div>
        </div>

        <section className="comments">
          <h2 className="comments__title">Comments</h2>
          {comments.map(comment => (
            <>
              {!comment.deleted ? (
                <Comment
                  key={comment.id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
                  handleUpCommentVote={handleUpCommentVote}
                  handleDownCommentVote={handleDownCommentVote}
                />
              ) : null}
            </>
          ))}
        </section>
        <NewComment
          disabled={disabled}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </article>
    </>
  )
}

PostPage.propTypes = {
  comments: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  post: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  values: PropTypes.object.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleUpPostVote: PropTypes.func.isRequired,
  handleDownPostVote: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleUpCommentVote: PropTypes.func.isRequired,
  handleDownCommentVote: PropTypes.func.isRequired
}

export default PostPage
