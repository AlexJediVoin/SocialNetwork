import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import {maxLenghtCreator, required } from '../../../utils/validators/validators';
import { Input } from '../../common/FormsControl/FormsControl';
import styles from './../../common/FormsControl/FormsControl.module.css'
export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

const maxLenght50 = maxLenghtCreator(50);

const LoginForm: React.FC <InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit} >
                <div><Field  type="text" name={"email"} placeholder={"Email"} component={Input}
                             validate={[required, maxLenght50]}/></div>
                <div><Field type="password" name={"password"} placeholder={"Password"} component={Input}
                            validate={[required, maxLenght50]}/></div>
                <div><Field type="checkbox" name={"rememberMe"} placeholder={"Запомнить меня."} component={Input}/>remember me</div>
                {
                    props.error && <div className={styles["form-summary-error"]}>{props.error}</div>
                }
                <div><button type={"submit"}>Login</button></div>
            </form>
    );
};

export default LoginForm;