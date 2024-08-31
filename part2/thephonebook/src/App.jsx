import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Header from "./components/Header"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import Update from "./components/Update"
import Error from "./components/Error"
import { useEffect } from 'react'
import { getAll, addContact, deleteContact, updateContact } from "./services/phonebook"
import "./index.css"


function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ update, setUpdate ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const onClick = () => {
    if(persons.some((person)=>person.number==newNumber)){
      return alert(`Contact No.${newNumber} is already added to the phonebook.`)
    } else if (persons.some((person)=>person.name === newName )) {
      if(window.confirm(`${newName} is already in your contacts, replace the old number with a new one?`)){
        const personObj = persons.filter(person=> person.name === newName)[0]
        const newPerson = {
          name: personObj.name,
          number: newNumber
        }
        const response = updateContact(personObj.id, newPerson)
        return response.then(resData=>{
          setPersons(persons.filter(person=>person.id!=personObj.id).concat(resData))
          setFilteredPersons(filteredPersons.filter(person=>person.id!=personObj.id).concat(resData))
          setUpdate(`${resData.name}'s contant number updated from ${personObj.number} to ${resData.number}`)
          setTimeout(()=>{
            setUpdate(null)
          }, 2000)
        })
    }
  }else if (newName === '' || newNumber === '') {
      return alert('Please add name and/or number')
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const responseData = addContact(newPerson)
    responseData.then((res)=>{
      setFilteredPersons(filteredPersons.concat(res))
      setPersons(persons.concat(res))
      setUpdate(`New contact added ${res.name}`)
      setTimeout(()=>{
        setUpdate(null)
      }, 2000)
    })
    setNewName('')
    setNewNumber('')
  }

  useEffect(()=>{
    getAll().then(resData=>{
      setPersons(resData)
      setFilteredPersons(resData)
    })
  }, [])

  const onChangeName = (e) => {
    setNewName(e.target.value)
  }

  const onChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const onChangeSearch = (e) => {
    const filtered = persons.filter((person)=>person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredPersons([...filtered])
  }

  const deleteButton = (person) => {
    if(window.confirm(`Are you sure you want to delete the contact named ${person.name}`)){
    const response = deleteContact(person.id)
    response.then(resData=>{
      setPersons(persons.filter(person=>person.id!=resData.id))
      setFilteredPersons(filteredPersons.filter(person=>person.id!=resData.id))
      setUpdate(`Deleted contant names ${resData.name} succesfully.`)
      setTimeout(()=>{
        setUpdate(null)
      }, 2000)
    })
    .catch(e=>{
      setErrorMessage(`${person.name} already deleted, refresh the page to view the changes.`)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 2000)
    })
  }
}

  return (
    <div>
      <Header title="The PhoneBook"/>
      <Update message={update} />
      <Error message={errorMessage} />
      <Filter onChange={onChangeSearch} />
      <PersonForm onChangeName={onChangeName} onChangeNumber={onChangeNumber} onClick={onClick} />
      <Header title="Number" />
      <Persons filtered={filteredPersons} buttonOnClick={deleteButton}/>
    </div>
  )
}

export default App
