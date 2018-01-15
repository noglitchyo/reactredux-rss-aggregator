import React from 'react';
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './containers/Root';

render(
    <MuiThemeProvider>
        <Root/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
