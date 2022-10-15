import React from 'react';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { login } from '../../Redux/auth-reducer';
import { AppStateType } from '../../Redux/redux-store';
import LoginForm, { FormDataType } from './LoginForm/LoginForm';

type PropsType = {
    login: (email: string, password: string, rememberMe: boolean)=>void
}

type mapStateToPropsType = {
    isAuth: boolean;
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.data.isAuth,
    }
}

const Login = (props: PropsType & mapStateToPropsType) => {
    const onSubmite= (formData: FormDataType) => {
        props.login(formData.email,formData.password,formData.rememberMe)
        console.log(formData)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmite}/>
        </div>
    );
};
const LoginReduxForm = reduxForm<FormDataType>({
    form: "login",
})(LoginForm)


export default connect<mapStateToPropsType,PropsType, {}, AppStateType>(mapStateToProps, {login})(Login);