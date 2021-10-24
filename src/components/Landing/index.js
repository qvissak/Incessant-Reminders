/* global chrome */

import React from 'react'
import TextBox from './TextBox'
import ReminderFrequency from './ReminderFrequency'

import './styles.css'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      numberOfReminders: this.updateNumberOfReminders(),
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

  getTextBoxComponent = (key) => <TextBox key={key} id={key}
    defaultValue={this.getReminder(key)} onReminderChange={this.saveReminder}
    onDelete={() => this.deleteReminder(key)} />

  getTextFields = () =>
    Array.from(Array(window.localStorage.length), (_, i) => {
      const key = i.toString()
      return this.getTextBoxComponent(key)
    })

  // Use this function asynchronously
  updateNumberOfReminders = () => {
    this.setState({ numberOfReminders: window.localStorage.length - 1 })
  }

  getReminder = key => window.localStorage.getItem(key)

  saveReminder = async reminder => {
    // Save the new reminder in the local storage
    const key = reminder.target.id
    window.localStorage.setItem(key, reminder.target.value)

    // Trigger background process for first time setting a reminder
    if (this.state.numberOfReminders <= 1 && window.localStorage.length - 1 > 0) {
      const minutesUntilReminder = Number(window.localStorage.getItem('reminder_frequency'))
      chrome.alarms.create(key, { delayInMinutes: minutesUntilReminder })
    }

    await this.updateNumberOfReminders()

    // Add a new reminder text box if other text boxes are full
    const areRemindersFull = this.state.textFields.length === this.state.numberOfReminders
    if (areRemindersFull) {
      const largestKey = this.state.textFields[this.state.textFields.length - 1].key
      const nextKey = (Number(largestKey) + 1).toString()
      this.setState(state => ({
        textFields: state.textFields.concat(this.getTextBoxComponent(nextKey))
      }))
    }
  }

  updateReminderFrequency = async event => {
    const minutes = Number(event.target.value)
    window.localStorage.setItem('reminder_frequency', minutes)
    chrome.storage.sync.set({ minutesUntilReminder: minutes })
    await this.setState({ reminderFrequencyMinutes: minutes })
  }

  deleteReminder = async key => {
    // Disable deleting the last empty reminder text field
    const isNotLastEmptyBox = key !== this.state.textFields[this.state.textFields.length - 1].key
    if (isNotLastEmptyBox) {
      window.localStorage.removeItem(key)
      await this.setState(state => ({
        numberOfReminders: window.localStorage.length - 1,
        textFields: state.textFields.filter(textBox => textBox.key !== key)
      }))
    }
  }

  render = () =>
    <div className="Landing">
      <div className="Landing_ReminderFrequency">
        <ReminderFrequency updateTime={this.updateReminderFrequency} reminderFrequencyMinutes={this.state.reminderFrequencyMinutes} />
      </div>
      <div>{this.state.textFields}</div>
    </div>
}

export default Landing
