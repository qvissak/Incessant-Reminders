import React from 'react'
import TextField from '@material-ui/core/TextField'

import './styles.css'

class TextBox extends React.Component {
  render () {
    const { nextKey, defaultValue, onChange } = this.props

    return <TextField id={nextKey} key={nextKey} className="Landing_item"
      placeholder="Remind me to..." fullWidth defaultValue={defaultValue}
      onChange={onChange}/>
  }
}

export default TextBox
