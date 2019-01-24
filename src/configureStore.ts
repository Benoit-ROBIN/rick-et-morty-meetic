import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'


// Import the state interface and our combined reducers/sagas.
import { ApplicationState, rootReducer, rootSaga } from './store'

/**
 * configureStore est une fonction qui prend deux params et renvoi un Store de type ApplicationState
 * @param history 
 * @param initialState 
 */
export default function configureStore(initialState?: object): Store<ApplicationState> {
  // création du middleware pour les devTools
  const composeEnhancers = composeWithDevTools({})

  // création du middleware pour redux-saga
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware]

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  // On créer le store avec les reducers pour heroes et les sagas pour les appels ajax concernant heroes
  const store = createStore( 
      rootReducer, 
      initialState!, 
      enhancer
  )

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}
