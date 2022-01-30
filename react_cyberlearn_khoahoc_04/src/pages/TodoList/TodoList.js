import React, { Component } from 'react';
import Axios from 'axios'
import './TodoList.css'
export default class TodoList extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })

        promise.then((result) => {
            // console.log(result.data)
            // Nếu gọi api lấy về kết quả thành công 
            // set lại state của component

            this.setState({
                taskList: result.data
            })
        });

        promise.catch((err) => {
            console.log('That bai', err.response.data)
        });
    }

    renderTaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button"
                        onClick={() => { this.deleteTask(item.taskName) }}
                    >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button'
                        onClick={() => { this.doneTask(item.taskName) }}
                    >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    // hàm sẽ tự động thực thi sau khi nội dung component được render (Load nội dung ra sẵn)
    componentDidMount() {
        this.getTaskList();
    }

    renderTaskTodoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button"
                        onClick={() => { this.deleteTask(item.taskName) }}
                    >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button'
                        onClick={() => { this.rejectTask(item.taskName) }}
                    >
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }

    // Hàm xử lí reject task
    rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    // Hàm xử lí done task
    doneTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    // Hàm xử lí xóa task
    deleteTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })

        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })

        promise.catch(error => {
            alert('Lỗi:' + error.response.data)
        })
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        console.log(value, name)

        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value };

        let newErrors = { ...this.state.errors };
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(value) || value.trim() === '') {
            newErrors[name] = name + 'invalid !'
        } else {
            newErrors[name] = ''
        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    addTask = (e) => {
        e.preventDefault(); // dừng sự kiện submit form
        console.log(this.state.values.taskName)
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        });

        // xử lý thành công
        promise.then(result => {
            this.getTaskList()
        })

        // xử lí thất bại
        promise.catch(error => {
            alert(error.response.data)
        })
    }
    render() {
        return (
            <form onSubmit={
                this.addTask}>
                {/* <button onClick={() => {
                    this.getTaskList()
                }}>Get task list</button> */}
                <div className="card">
                    <div className="card__header">
                        <img src={require('./bg.png')} alt={require('./bg.png')} />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                <button id="addItem"
                                    onClick={
                                        this.addTask
                                    }
                                >
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className='text text-danger'>{this.state.errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskTodo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskTodoDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
