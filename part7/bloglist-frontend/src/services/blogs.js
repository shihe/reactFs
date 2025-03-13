import axios from 'axios'
const baseUrl = '/api/blogs'

const formatToken = (newToken) => {
  return `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: formatToken(token) },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: formatToken(token) },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove }
