import * as React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';

import { CharactersStack } from '../src/navigation/routes'
import configureStore from './configureStore'

const store = configureStore()

const App = createAppContainer(CharactersStack);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root