import React,{Fragment} from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Home/Header/Header';


// Do Hometemplate là 1 component nên sử dụng arrow function

export const HomeTemplate = (props) => {

    const {Component,...restParam} = props;
    return <Route {...restParam} render={(propsRoute)=>{
        return <>
            <Header />
            <Component {...propsRoute} />
        </>
    }} />

}
