import React, { ComponentType } from 'react';
import {Field, WrappedFieldProps} from 'redux-form';
import styles from "../../common/FormsControl/FormsControl.module.css"
import {ReactNode} from "react";

interface Props extends WrappedFieldProps {
    children: ReactNode
}

export const Textarea = (props: Props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...restProps} {...input}/>
    </FormControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input {...restProps} {...input}/>
    </FormControl>
}


export const FormControl = ({input, meta:{touched,error}, children}: Props) => {
    let hasError = touched && error;
    return (
        <div className={styles["form-control"] + " " + (hasError ? styles["error"] : "")}>
            {children}
            {hasError && <p>{error}</p>}
        </div>
    );
};

export const createField = (placeholder: string | null, name: string, validators: ((value: string)=>string | undefined )[],
                            component: ComponentType<WrappedFieldProps> =Input, props:{type?:string}={},text="") => (<div>
    <Field type="text" name={name}
           placeholder={placeholder}
           component={component}
           validate={validators}
           {...props}/>{text}
</div>)


