import Axios from 'axios'
import { domain } from '../util/constants/settingSystem'

export class TodoListService {
    constructor() {

    }

    getTaskApi = () => {
        return Axios({
            url: `${domain}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return Axios({
            url: `${domain}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
    }

    deleteTaskApi = (taskName) => {
        return Axios({
            url: `${domain}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }

    checkDoneTaskApi = (taskName) => {
        return Axios({
            url: `${domain}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }

    rejectTaskApi = (taskName) => {
        return Axios({
            url: `${domain}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }
}

export const todoListService = new TodoListService()
