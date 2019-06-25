import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './components/Page';
import * as serviceWorker from './serviceWorker';
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import store from './store'

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true,
  },
})

const App = () => {
  return <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <Page />
    </MuiThemeProvider>
  </StoreProvider>
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
