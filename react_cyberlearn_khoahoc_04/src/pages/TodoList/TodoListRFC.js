import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function TodoListRFC(props) {

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
    // Tương ứng với componenetDidmount
    // Nếu dùng useEffect không có tham số thứ 2( là [] ) thì lúc nào cập nhật lại sẽ render lại component
    useEffect(() => {
        getTaskList()
        return () => {

        }
    }, [])

    const getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })

        promise.then((result) => {
            // console.log(result.data)
            // Nếu gọi api lấy về kết quả thành công 
            // set lại state của component

            setState({
                ...state, // giữ lại các giá trị của những thằng cũ(values , errors), nếu không thì sau khi render lại sẽ mất hêts
                taskList: result.data
            })
        });

        promise.catch((err) => {
            console.log('That bai', err.response.data)
        });
    }

    const renderTaskTodo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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

    
    const addTask = (e) => {
        e.preventDefault(); // dừng sự kiện submit form
        console.log(state.values.taskName)
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        });

        // xử lý thành công
        promise.then(result => {
            getTaskList()
        })

        // xử lí thất bại
        promise.catch(error => {
            alert(error.response.data)
        })
    }

    // Hàm xử lí reject task
    const rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            alert(result.data)
            getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    // Hàm xử lí done task
    const doneTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            alert(result.data)
            getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    // Hàm xử lí xóa task
    const deleteTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })

        promise.then(result => {
            alert(result.data)
            getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    return (
        <div className="card">
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
