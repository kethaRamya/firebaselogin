import {createStore,compose, applyMiddleware} from 'redux';
import rootReducer from './reducer/index.js'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = compose(
    applyMiddleware(sagaMiddleware),
    // window.devToolExtension && window.devToolExtension(),
)(createStore)(rootReducer);
sagaMiddleware.run(rootSaga);
export default store;