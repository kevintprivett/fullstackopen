import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const response = await axios.put(baseUrl + `/${newObject.id}`, newObject)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(baseUrl + `/${id}`, config)
}

export default { getAll, create, update, remove, setToken }
