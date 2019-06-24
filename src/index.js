import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './components/Page';
import * as serviceWorker from './serviceWorker';
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import store from './redux/store'

const theme = createMuiTheme({
  palette: {
    primary: {
      50: '#e0e0e0',
      100: '#bdbdbd',
      200: '#757575',
      300: '#616161',
      400: '#424242',
      500: '#363636',
      600: '#181818',
      700: '#121212',
      800: '#060606',
      900: '#000000',
      A100: '#424242',
      A200: '#282828',
      A400: '#101010',
      A700: '#000000'
    }
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
