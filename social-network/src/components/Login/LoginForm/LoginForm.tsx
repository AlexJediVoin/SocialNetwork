import React from 'react';
import {InjectedFormProps } from 'redux-form';
import {maxLenghtCreator, required } from '../../../utils/validators/validators';
import {createField, Input } from '../../common/FormsControl/FormsControl';
import styles from './../../common/FormsControl/FormsControl.module.css'
export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

const maxLenght50 = maxLenghtCreator(50);

const LoginForm: React.FC <InjectedFormProps<FormDataType>> = ({handleSubmit,error}) => {
    return (
            <form onSubmit={handleSubmit} >
                <div>
                    {
                        createField("Email","email",[required, maxLenght50], Input, {type: "text"} )
                    }
                    {
                        createField("Password","password",[required, maxLenght50],Input, {type: "password"} )
                    }
                    {
                        createField(null,"rememberMe",[],Input, {type: "checkbox"},"remeberMe" )
                    }
                    {/*<Field  type="text" name={"email"} placeholder={"Email"} component={Input}
                             validate={[required, maxLenght50]}/>*/}
                </div>
                {/*<div><Field type="password" name={"password"} placeholder={"Password"} component={Input}
                            validate={[required, maxLenght50]}/></div>
                <div><Field type="checkbox" name={"rememberMe"} placeholder={"Запомнить меня."} component={Input}/>remember me</div>*/}
                {
                    error && <div className={styles["form-summary-error"]}>{error}</div>
                }
                <div><button type={"submit"}>Login</button></div>
            </form>
    );
};

export default LoginForm;