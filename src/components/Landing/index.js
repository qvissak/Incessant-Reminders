/* global chrome */

import React from 'react'
import TextBox from './TextBox'
import ReminderFrequency from './ReminderFrequency'

import './styles.css'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      numberOfReminders: window.localStorage.length - 1,
      reminderFrequencyMinutes: this.getReminderFrequency(),
      textFields: this.getTextFields()
    }
  }

  getReminderFrequency = () => {
    if (!window.localStorage.getItem('reminder_frequency')) {
      window.localStorage.setItem('reminder_frequency', 60)
    }
    return window.localStorage.getItem('reminder_frequency')
  }

  getTextFields = () => {
    // Default to at least 5 text boxes
    // Indexing is weird because of the 'reminder_frequency' variable
    const numberTextBoxesToRender = window.localStorage.length - 1 < 5 ? 5 : window.localStorage.length
    return Array.from(Array(numberTextBoxesToRender), (_, i) => {
      const key = i.toString()
      return <TextBox key={key} id={key} defaultValue={this.getReminder(key)} onChange={this.saveReminder} />
    })
  }

  getReminder = key => window.localStorage.getItem(key)

  saveReminder = reminder => {
    // Save the new reminder in the local storage
    const key = reminder.target.id
    window.localStorage.setItem(key, reminder.target.value)

    // Trigger background process for first time setting a reminder
    if (this.state.numberOfReminders <= 1 && window.localStorage.length - 1 > 0) {
      const minutesUntilReminder = Number(window.localStorage.getItem('reminder_frequency'))
      chrome.alarms.create(key, { delayInMinutes: minutesUntilReminder })
    }

    this.setState({ numberOfReminders: window.localStorage.length - 1 })

    // If the default 5 reminders are full, add a new one
    const areRemindersFull = this.state.textFields.length === window.localStorage.length - 1
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
    chrome.storage.sync.set({ minutesUntilReminder: minutes })
    this.setState({ reminderFrequencyMinutes: minutes })
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
