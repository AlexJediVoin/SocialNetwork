import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';

export type FormDataType = {
    login: string,
    password: string,
    checkbox: boolean,
}

const LoginForm: React.FC <InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit} >
                <div><Field  type="text" name={"login"} placeholder={"Login"} component={"input"}/>  </div>
                <div><Field type="password" name={"password"} placeholder={"Password"} component={"input"}/></div>
                <div><Field type="checkbox" name={"rememberMe"} placeholder={"Запомнить меня."} component={"input"}/>remember me</div>
                <div><button type={"submit"}>Login</button></div>
            </form>
    );
};

export default LoginForm;