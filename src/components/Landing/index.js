import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      textFields: this.getTextFields()
    }
  }

  getTextFields = () =>
    // Default to 10 text field boxes on initial usage
    Array.from(Array(10), (_, i) => {
      const key = i.toString()
      return <TextField id={key} key={key} className="Landing_item"
        placeholder="Remind me to..." fullWidth defaultValue={this.getReminder(key)}
        onChange={this.saveReminder}/>
    })

  getReminder = (key) => window.localStorage.getItem(key)

  saveReminder = (reminder) => {
    // Save the new reminder in the local storage
    const key = reminder.target.id
    window.localStorage.setItem(reminder.target.id, reminder.target.value)

    // If the default 10 reminders are full, add a new one
    const areRemindersFull = this.state.textFields.length === window.localStorage.length
    if (areRemindersFull) {
      const nextKey = (Number(key) + 1).toString()
      this.setState({
        textFields: this.state.textFields.concat(
          <TextField id={nextKey} key={nextKey} className="Landing_item"
            placeholder="Remind me to..." fullWidth defaultValue={this.getReminder(nextKey)}
            onChange={this.saveReminder}/>
        )
      })
    }
  }

  render = () =>
    <div className="Landing">
      { this.state.textFields }
    </div>
}

export default Landing
