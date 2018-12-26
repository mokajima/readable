const api = 'http://localhost:3001'

// Generate a unique token for storing your own data on the backend server
let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'Application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getComments = () =>
  fetch(`${api}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addCommentToPost = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...comment })
  })
    .then(res => res.json())

export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...comment })
  })
    .then(res => res.json())

export const disableComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addNewPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  })
    .then(res => res.json())

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...post })
  })

export const disablePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
