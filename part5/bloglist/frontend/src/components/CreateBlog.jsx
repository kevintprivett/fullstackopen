import { useState } from 'react'

const CreateBlog = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const createBlog = (event) => {
    event.preventDefault()

    handleCreate({
      title: title,
      author: author,
      url: url
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <label htmlFor="title">title:</label>
        <input 
          data-testid='title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        <br />
        <label htmlFor="author">author:</label>
        <input 
          data-testid='author'
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          />
        <br />
        <label htmlFor="url">url:</label>
        <input 
          data-testid='url'
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
