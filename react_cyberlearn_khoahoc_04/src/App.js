import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import PageNotFauld from './pages/PageNotFauld/PageNotFauld';
import Profile from './pages/Profile/Profile';
import TodoList from './pages/TodoList/TodoList';
import TodoListRfc from './pages/TodoList/TodoListRFC';
import TodoListRedux from './pages/TodoList/TodoListRedux';
import BaiTapTodoListSaga from './pages/BaiTapTodoListSaga/BaiTapTodoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';

function App() {
  return (

    // Những Route để trong BrowserRouter có chức năng là ẩn đi và chỉ hiện khi mình click vào
    <BrowserRouter>
      {/* Lỗi cực ngu !!!! */}
      {/* <Header /> */}
      {/* Phải khai báo modal ở đây nó mới hiện lên được modal khi nhấn vào button */}
      <Modal />
      <LoadingComponent />
      <Switch>

      {/* HomeTemplate hoặc Route */}
      {/* Component hoặc component  */}
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>

        {/* <Route exact path='/home' component={Home} render={(propsRoute) => {
              return <div>
                      <Header />
                      <Home { ...propsRoute } />
              </div>
        }} /> */}
        <HomeTemplate exact path='/contact' Component={Contact} render={(propsRoute) => {
              return <div style={{backgroundColor:'#fff'}}>
                        <Contact { ...propsRoute } />
              </div>
        }} />
        <HomeTemplate exact path='/about' Component={About} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <HomeTemplate exact path={'/detail/:id'} Component={Detail} />
        <HomeTemplate exact path={'/profile'} Component={Profile} />
        <HomeTemplate exact path={'/todolistrcc'} Component={TodoList} />
        <HomeTemplate exact path={'/todolistrfc'} Component={TodoListRfc} />
        <HomeTemplate exact path={'/todolistredux'} Component={TodoListRedux} />
        <HomeTemplate exact path={'/todolistsaga'} Component={BaiTapTodoListSaga} />
        <HomeTemplate exact path={'/demohocmodal'} Component={DemoHOCModal} />

        <HomeTemplate exact path={'*'} Component={PageNotFauld}/>

        <HomeTemplate exact path={'/'} Component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
