import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl, asObject(content))
  return response.data
}

const update = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}

const updateAll = async (content) => {
  const response = await axios.put(baseUrl, content)
  return response.data
}

export default { get, getAll, create, update, updateAll }