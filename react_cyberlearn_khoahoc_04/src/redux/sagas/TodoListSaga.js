
import { call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASK_API, GET_TASK_LIST_API, REJECT_TASK_API } from '../constants/TodoListConstant';
import { todoListService } from "../../services/TodoListService"
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConstant';
//  redux có 2 loại action:
//   loại 1: action trả về object(action thường)
//   ***loại 2: action trả về function (action thường dùng để xử lí api hoặc gọi các action khác)

/*
    Trung 2022
    action lấy danh sách task từ api
*/
function* getTaskApi(action) {

    // put giống dispatch action
    yield put({
        type: DISPLAY_LOADING,
    })

    try {

        let { data, status } = yield call(
            todoListService.getTaskApi
        )

        yield delay(1000)

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        } else {
            console.log('lỗi')
        }

    } catch (err) {
        console.log('lỗi', err)
    }

    yield put({
        type: HIDE_LOADING,
    })

}

export function* theoDoiActionGetTaskApi() {
    // yield fork(getTaskApi); // non-blocking - chạy không cần chờ

    // takeEvery dùng để theo dõi action nào được dispatch lên bởi useDispatch
    // yield takeEvery('TypeAction', getTaskApi)

    // nếu click 10 lần thì nó chỉ nhận thằng dispatch cuối cùng ( thằng thứ 10)
    yield takeLatest(GET_TASK_LIST_API, getTaskApi) // kết hợp giữa fork và take dùng để theo dõi 1 action saga
}


/*
    Trung 2022
    action add task từ api
*/

function* addTaskApiAction(action) {

    console.log(action)
    const { taskName } = action;
    // gọi api
    try {
        const { data, status } = yield call(() => { return todoListService.addTaskApi(taskName) });

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_LIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }

    // hiển thị loading 
    // thành công thì get lại task list


}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction) // kết hợp giữa fork và take dùng để theo dõi 1 action saga
}

function* deleteTaskApi(action) {

    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return todoListService.deleteTaskApi(taskName)
        });

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {
        console.log(err)
    }
}
/*
    Trung 2022
    action delete task từ api
*/

export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi) // kết hợp giữa fork và take dùng để theo dõi 1 action saga
}


function* checkDoneTaskApi(action) {

    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return todoListService.checkDoneTaskApi(taskName)
        });

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {

    }
}
/*
    Trung 2022
    action check done task từ api
*/

export function* theoDoiActionCheckDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi) // kết hợp giữa fork và take dùng để theo dõi 1 action saga
}

function* checkRejectTaskApi(action) {

    const { taskName } = action;

    try {
        const { data, status } = yield call(() => {
            return todoListService.rejectTaskApi(taskName)
        });

        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {

    }
}
/*
    Trung 2022
    action check reject task từ api
*/

export function* theoDoiActionCheckRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, checkRejectTaskApi) // kết hợp giữa fork và take dùng để theo dõi 1 action saga
}
