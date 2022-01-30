import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASK_LIST_API, REJECT_TASK_API } from '../../redux/constants/TodoListConstant';

export default function BaiTapTodoListSaga(props) {

    const dispatch = useDispatch()

    const { taskList } = useSelector(state => state.TodoListReducer)

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        console.log(value, name)

        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value };

        let newErrors = { ...state.errors };
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(value) || value.trim() === '') {
            newErrors[name] = name + 'invalid !'
        } else {
            newErrors[name] = ''
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    // hàm sẽ tự động thực thi sau khi nội dung component được render
    useEffect(() => {

        // gọi hàm getTaskList
        getTaskList()
        return () => {

        }
    }, [])

    // hàm get danh sách task
    const getTaskList = () => {
        // dispatch action saga
        dispatch({
            type:GET_TASK_LIST_API
        })
    }

    // hàm thêm task
    const addTask = (e) => {
        e.preventDefault()
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }

    // Hàm xử lí reject task
    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskName
        })
    }

    // Hàm xử lí done task
    const doneTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName: taskName
        })
    }

    // Hàm xử lí xóa task
    const deleteTask = (taskName) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName: taskName
        })
    }

    const renderTaskTodo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button"
                        onClick={() => { deleteTask(item.taskName) }}
                    >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button'
                        onClick={() => { doneTask(item.taskName) }}
                    >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskTodoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button"
                        onClick={() => { deleteTask(item.taskName) }}
                    >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button'
                        onClick={() => { rejectTask(item.taskName) }}
                    >
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }




    return (
        <div className="card">
            {/* <button className='btn btn-success'
                onClick={() => {
                    dispatch({
                        type: 'getTaskApi'
                    })
                }}
            >Dispatch action saga getTaskApi</button> */}
            <div className="card__header">
                <img src={require('./bg.png')} alt={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input
                            onChange={handleChange}
                            id="newTask" type="text"
                            name='taskName'
                            placeholder="Enter an activity..." />
                        <button id="addItem" type='submit' onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <p className='text text-danger'>{state.errors.taskName}</p>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskTodoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    );
}
