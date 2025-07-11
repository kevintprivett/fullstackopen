import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.toSorted((blogA, blogB) => blogA.likes - blogB.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    console.log('User logged out')
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.author.value,
      }
      setBlogs(blogs
        .concat(blogObject)
        .toSorted((blogA, blogB) => blogA.likes - blogB.likes))
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      setInfoMessage(`${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (blog) => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }

      setBlogs(
        blogs.map(blog => (blog.id === newBlog.id ? newBlog : blog))
          .toSorted((blogA, blogB) => blogA.likes - blogB.likes)
      )

      await blogService.update(newBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async (id) => {
    try {
      setBlogs(
        blogs
          .filter(blog => blog.id !== id)
          .toSorted((blogA, blogB) => blogA.likes - blogB.likes)
      )

      await blogService.remove(id)
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const renderBlogs = () => (
    <>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateBlog handleCreate={handleCreate} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          showDelete={blog.user ? user.username === blog.user.username : false}
          handleDelete={handleDelete}
        />
      )}
    </>
  )

  console.log(user)

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} infoMessage={infoMessage}/>

      {user === null && loginForm()}
      {user !== null && renderBlogs()}
    </div>
  )
}

export default App
