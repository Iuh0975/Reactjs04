import { all } from "redux-saga/effects";
import * as ToDoListSaga from './TodoListSaga'
// import {theoDoiActionGetTaskApi} from './TodoListSaga'

export function* rootSaga() {
   
    yield all ([
        // nghiệp vụ theo dõi các action saga todoList
        ToDoListSaga.theoDoiActionGetTaskApi(),

        // nghiệp vụ action add task
        ToDoListSaga.theoDoiActionAddTaskApi(),

        // nghiệp vụ action delete task
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        
        // nghiệp vụ action check done task
        ToDoListSaga.theoDoiActionCheckDoneTaskApi(),
        
        // nghiệp vụ action check reject task
        ToDoListSaga.theoDoiActionCheckRejectTaskApi(),
    ])

}
