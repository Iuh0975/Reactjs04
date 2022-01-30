import Axios from 'axios';
import { GET_TASK_API } from '../constants/TodoListConstant';

// action có 2 loại: 
// - 1 là action thực thi ngay làm thay đổi reducer ( action 1)
// - 2 là action phải thực thi xử lí rồi mới gọi action 1 thực thi ( async action)

export const getTaskListApi = () => {

    // Tiền xử lí dữ liệu => xử lí function
    return async dispatch => {
        // cach 1
        // let res = Axios({
        //     url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
        //     method: 'GET'
        // })

        // cach 2: bóc tách
        try {
            // data, status là những thuộc tính mà api trả về
            let { data, status, ...res } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            console.log(data)

            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }
        } catch (err) {
            console.log(err.response.data)
        }

        // promise.then((result) => {
        //     // console.log(result.data)
        //     // Nếu gọi api lấy về kết quả thành công 
        //     // set lại state của component

        //     dispatch({
        //         type: GET_TASK_API,
        //         taskList: result.data
        //     })
        // });

        // promise.catch((err) => {
        //     console.log('That bai ', err.response.data)
        // });
    }
};

export const addTaskApi = (taskName) => {
    return async dispatch => {

        // xử lí trước khi dispatch
        try {
            let { data, status, ...res } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: taskName }
            });

            if (status === 200) {
                dispatch(getTaskListApi())
            }

        } catch (err) {
            console.log(err.response.data)
        }

        // // xử lý thành công
        // promise.then(result => {
        //     dispatch(getTaskListApi())
        // })

        // // xử lí thất bại
        // promise.catch(error => {
        //     alert(error.response.data)
        // })
    }
}

export const deleteTaskApi = (taskName) => {

    // dispatch này do redux-thunk trả về khi dùng useDispatch()
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })

        promise.then(result => {
            dispatch(getTaskListApi())
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            dispatch(getTaskListApi())
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }
}

export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            dispatch(getTaskListApi())
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }
}

