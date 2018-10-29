/* global chrome */

import React from 'react'
import TextBox from './TextBox'
import ReminderFrequency from './ReminderFrequency'

import './styles.css'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      reminderFrequencyMinutes: this.getReminderFrequency(),
      textFields: this.getTextFields()
    }
  }

  getReminderFrequency = () => window.localStorage.getItem('reminder_frequency') || 60

  getTextFields = () => {
    // Default to at least 10 text boxes
    const numberTextBoxesToRender = window.localStorage.length < 10 ? 10 : window.localStorage.length + 1
    return Array.from(Array(numberTextBoxesToRender), (_, i) => {
      const key = i.toString()
      return <TextBox key={key} id={key} defaultValue={this.getReminder(key)} onChange={this.saveReminder} />
    })
  }

  getReminder = (key) => window.localStorage.getItem(key)

  saveReminder = (reminder) => {
    // Save the new reminder in the local storage
    const key = reminder.target.id
    window.localStorage.setItem(reminder.target.id, reminder.target.value)

    // Set the reminder
    chrome.alarms.create({ delayInMinutes: this.state.reminderFrequencyMinutes })
    chrome.storage.sync.set({ minutes: this.state.reminderFrequencyMinutes })

    // If the default 10 reminders are full, add a new one
    const areRemindersFull = this.state.textFields.length === window.localStorage.length
    if (areRemindersFull) {
      const nextKey = (Number(key) + 1).toString()
      this.setState({
        textFields: this.state.textFields.concat(
          <TextBox key={nextKey} id={nextKey} defaultValue={this.getReminder(nextKey)} onChange={this.saveReminder}/>
        )
      })
    }
  }

  updateReminderFrequency = event => {
    const minutes = Number(event.target.value)
    window.localStorage.setItem('reminder_frequency', minutes)
    this.setState({
      reminderFrequencyMinutes: minutes
    })
  }

  render = () =>
    <div className="Landing">
      <div className="Landing_ReminderFrequency">
        <ReminderFrequency updateTime={this.updateReminderFrequency} reminderFrequencyMinutes={this.state.reminderFrequencyMinutes} />
      </div>
      <div>{ this.state.textFields }</div>
    </div>
}

export default Landing
