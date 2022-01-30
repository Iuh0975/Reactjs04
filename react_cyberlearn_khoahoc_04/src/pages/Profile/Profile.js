
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Profile() {

    // check user có tồn tại login
    if (localStorage.getItem('userLogin')) {
        return (
            <div>
                Profiel
            </div>
        );
    } else {
        alert('Vui lòng đăng nhập để vào trang này !!!')
        return <Redirect to={'/login'} />
    }
}
