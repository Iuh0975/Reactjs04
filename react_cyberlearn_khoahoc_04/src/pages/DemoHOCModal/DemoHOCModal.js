import React from "react";
import { useDispatch } from "react-redux";
import Register from "../Register/Register";
import Login from "../Login/Login"
import Slidedown from "../../HOC/Modal/Slidedown";

export default function DemoHOCModal() {

    // Phải để trong body vì đã xài hook ở trong body bên Slidedown
    // tạo ra 1 component với logic của component login nhưng được thừa hưởng từ Slidedown và được bao bọc trong đó  
    const LoginWithSlideDown = () =>  new Slidedown(Register);

    const dispatch = useDispatch();

    return (
        <div>
            {/* Button trigger modal */}
            <button onClick={() => {
                dispatch({
                     type:"OPEN_FORM",
                     Component: <Login />
                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Đăng nhập
            </button>

            <button onClick={() => {
                dispatch({
                    type:'OPEN_FORM',
                    Component:<Register />
                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Đăng ký
            </button>

            {/* Khai báo ra để sử dụng  */}
            <LoginWithSlideDown />
        </div>
    );
}
