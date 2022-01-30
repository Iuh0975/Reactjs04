import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';

export default function Login(props) {

    // lúc đầu để status bằng false => trừ trường hợp người ta lỡ vào login
    // nếu đã nhập liệu thì status chuyển thành true
    const [userLogin, setUserLogin] = useState({
        userName: '',
        passWord: '',
        status: false
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        const newUserLogin = {
            ...userLogin,
            [name]: value
        }

        // gắn cờ
        // đủ 2 trường username với password sẽ cho đi ( lúc này valid = false)
        let valid  = true;
        for (let key in newUserLogin) {
            if (key !== 'status') {

                if (newUserLogin[key].trim() === '') {
                    valid = false;
                }
            }
        }

        if(!valid) {
            newUserLogin.status = true
        } else {
            newUserLogin.status = false
        }
        setUserLogin(newUserLogin)
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if (userLogin.userName === 'Admin' && userLogin.passWord === 'admin123') {
            // thành công thì chuyển về trang trước đó
            props.history.goBack();

            // chuyển đến trang chỉ định sau khi xử lí
            // chuyển hướng để path tương ứng
            // props.history.push('/home');

            // thay đổi nội dung
            // props.history.replace('/home');

            props.history.goBack()
            localStorage.setItem('userLogin', JSON.stringify(userLogin));

        } else {
            alert('Login fail')
            return;
        }
    }

    return (<form className='container' onSubmit={handleLogin}>
        <div className='form-group'>
            <p>UserName</p>
            <input name='userName' className='form-control' onChange={handleChange} />
        </div>
        <div className='form-group'>
            <p>Password</p>
            <input type={'password'} name='passWord' className='form-control' onChange={handleChange} />
        </div>

        <div className='form-group'>
            <button className='btn btn-primary'>Đăng nhập</button>
        </div>

        {/* Khi đang nhập thông tin login thì check lại có rời khỏi trang này */}
        {/* Truyền status khi người dùng nhập liệu check xem người ta có đang nhập liệu không */}
        <Prompt when={userLogin.status} message={(location) => {
            return 'Bạn có chắc muốn rời khỏi trang này'
        }} />
    </form>
    )
}
