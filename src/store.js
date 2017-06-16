import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';


export default createStore(() => [], undefined, applyMiddleware(thunk));





