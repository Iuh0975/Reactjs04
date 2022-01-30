
   
import React from 'react'


const stateDefault = {
    // dùng thẻ phải import react vào
    Component: <p>Nội dung mặc định: </p>
}

export  const ModalReducer = (state = stateDefault,action) => {
    switch (action.type) {
        case 'OPEN_FORM':{
            state.Component = action.Component;
            return { ...state }
        }
        default: return { ...state }
    }
}