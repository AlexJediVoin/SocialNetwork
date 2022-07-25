import React from 'react';
import { reduxForm } from 'redux-form';
import LoginForm, { FormDataType } from './LoginForm/LoginForm';

const Login = () => {
    const onSubmite= (formData: FormDataType) => {
        console.log(formData)
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


export default Login;