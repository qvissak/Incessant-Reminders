import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import './styles.css'

const TextBox = ({ id, defaultValue, onReminderChange, onDelete }) => {
  return (
    <div className="TextBox_container">
      <TextField id={id} className="Landing_item" placeholder="Remind me to..."
        fullWidth defaultValue={defaultValue} onChange={onReminderChange} />
      <IconButton onClick={onDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default TextBox
