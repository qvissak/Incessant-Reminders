import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import './styles.css'

const Header = () => {
  return (
    <AppBar color="default">
      <Toolbar variant="dense">
        <Typography variant="subtitle1" color="inherit">
          Incessant Reminders
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header
