import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, showDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const deleteButtonStyle = { display: showDelete ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <div>
          <button
            style={deleteButtonStyle}
            onClick={
              () => {
                if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)) {
                  handleDelete(blog.id)
                }
              }
            }>
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
