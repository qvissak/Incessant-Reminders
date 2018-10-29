import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

class ReminderFrequency extends React.Component {
  render = () => {
    const { updateTime, reminderFrequencyMinutes } = this.props

    return <TextField
      label="Reminder Frequency"
      value={reminderFrequencyMinutes}
      onChange={updateTime}
      type="number"
      InputLabelProps={{
        shrink: true
      }}
      helperText="How frequently (in minutes) do you want to be reminded?"
      margin="none"
      variant="outlined"
    />
  }
}

export default ReminderFrequency
