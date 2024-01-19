import axios from 'axios'

const registerNewUser = (email, phone, username, password) => {
  return axios.post('http://localhost:8081/api/v1/register', {
    email,
    phone,
    username,
    password,
  })
}

const loginUser = (valueLogin, password) => {
  return axios.post('http://localhost:8081/api/v1/login', {
    valueLogin,
    password,
  })
}

const deleteUser = (user) => {
  return axios.delete('http://localhost:8081/api/v1/user/delete', {
    data: { id: user.id },
  })
}

const fetchAllUser = (page, limit) => {
  return axios.get(
    `http://localhost:8081/api/v1/user/read?page=${page}&limit=${limit}`,
  )
}

const fetchGroup = () => {
  return axios.get(`http://localhost:8081/api/v1/group/read`)
}

const createNewUser = (userData) => {
  return axios.post('http://localhost:8081/api/v1/user/create', { ...userData })
}
export {
  registerNewUser,
  loginUser,
  fetchAllUser,
  deleteUser,
  fetchGroup,
  createNewUser,
}
