import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response=>response.data)
}

const addContact = (newNumber) => {
    const response = axios.post(baseUrl, newNumber)
    return response.then(res=>res.data)
}

const deleteContact = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(res=>res.data)
}

const updateContact = (id, person) => {
    const response = axios.put(`${baseUrl}/${id}`, person)
    return response.then(res => res.data)
}

export { getAll, addContact, deleteContact, updateContact }