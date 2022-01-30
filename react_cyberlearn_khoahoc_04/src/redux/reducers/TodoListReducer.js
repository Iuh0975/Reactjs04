import { GET_TASK_API } from "../constants/TodoListConstant";

const initialState = {
    taskList: []
};

const TodoListReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_API: {
            state.taskList = action.taskList
            return { ...state }
        }

        default:
            return state;
    }
}

export default TodoListReducer;

