import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isStarClicked: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      name: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickStarred = () => {
    const {isStarClicked} = this.state
    this.setState({isStarClicked: !isStarClicked})
  }

  render() {
    const {appointmentList, isStarClicked, titleInput, dateInput} = this.state
    let colorClass = ''
    let filteredList
    if (isStarClicked) {
      colorClass = ' colorClass'
      filteredList = appointmentList.filter(
        eachItem => eachItem.isStarred === true,
      )
    } else {
      filteredList = appointmentList
    }
    return (
      <div className="bg-container">
        <div className="card">
          <div className="card-container">
            <div className="card-part1">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.addAppointment}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  value={titleInput}
                  className="input"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  id="date"
                  className="input"
                  value={dateInput}
                  type="date"
                  onChange={this.onChangeDate}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="card-part2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="appointments">
            <h1 className="paragraph">Appointments</h1>
            <button
              className={`starred-button ${colorClass}`}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                details={eachItem}
                onClickStar={this.onClickStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
