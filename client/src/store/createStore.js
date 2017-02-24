import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import makeRootReducer from './reducers'

import apiErrorHandlingMidddlware from 'utils/middleware/apiErrorHandling'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [thunk,
    apiMiddleware,
    apiErrorHandlingMidddlware,
    sagaMiddleware
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
