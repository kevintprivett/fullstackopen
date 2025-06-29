import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('Wrong credentials')
      console.log(exception)
      // setErrorMessage('Wrong credentials')
      // setTimeout logic
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
            onChange={({ target}) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
    </form>
  )

  const renderBlogs = () => (
    <>
      <p>{user.name} logged in </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && renderBlogs()}
    </div>
  )
}

export default App
