import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

class ReminderFrequency extends React.Component {
  render = () => {
    const { updateTime, reminderFrequencyMinutes } = this.props
    const incorrectInput = reminderFrequencyMinutes <= 0
    const errorMessage = 'Please enter a number greater than 0.'
    const directions = 'How frequently (in minutes) do you want to be reminded?'

    return <TextField
      label="Reminder Frequency"
      value={reminderFrequencyMinutes}
      onChange={updateTime}
      InputLabelProps={{
        shrink: true
      }}
      error={incorrectInput}
      helperText={incorrectInput ? errorMessage : directions}
      margin="none"
      variant="outlined"
    />
  }
}

export default ReminderFrequency
