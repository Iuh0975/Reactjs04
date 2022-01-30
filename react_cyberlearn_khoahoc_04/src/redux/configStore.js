import { applyMiddleware, combineReducers, createStore } from 'redux'
import TodoListReducer from './reducers/TodoListReducer'
import LoadingReducer from './reducers/LoadingReducer'
import reduxThunk from 'redux-thunk'
// Phải dùng dấu ngoặc nhọn ở ModalReducer vì đây là import 1 component
import {ModalReducer} from './reducers/ModalReducer'

// middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    // reducer khai báo tại đây
    TodoListReducer,
    LoadingReducer,
    ModalReducer
})

// Phải import reduxthunk vào mới dispatch một cái function được
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

// gọi saga
middleWareSaga.run(rootSaga)

export default store;
