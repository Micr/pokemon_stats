import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import pokemonStore from './pokemonStore';
import App from './App';
import './index.css';

ReactDOM.render(<Provider store={pokemonStore}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Provider>, document.getElementById('root'));
