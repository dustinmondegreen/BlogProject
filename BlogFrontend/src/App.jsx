import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const blogs = blogService.getAll() 
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <label>
        username
        <input 
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          />
      </label>
      <br />
      <br />
      <label>
        password
        <input 
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}/>
      </label>
      <button type='submit'>Login</button>
    </form>
  )

  const blogForm = () => {
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogUser')
      }}>Logout</button>
    </div>
  }

  return (
    <div>
      <h1>{errorMessage}</h1>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App