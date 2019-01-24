import { createAppContainer } from 'react-navigation';
import { CharactersStack } from '../src/navigation/routes'

import configureStore from './configureStore'

const store = configureStore({})


export default createAppContainer(CharactersStack);
