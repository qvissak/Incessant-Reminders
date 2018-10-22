import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

class TextBox extends React.Component {
  render () {
    const { id, defaultValue, onChange } = this.props

    return <TextField id={id} className="Landing_item" placeholder="Remind me to..."
      fullWidth defaultValue={defaultValue} onChange={onChange}/>
  }
}

export default TextBox
