import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducer from './rootReducer'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk]

if(process.env.node_env !== 'production'){
    middleware.push(logger)
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export const persistor = persistStore(store)