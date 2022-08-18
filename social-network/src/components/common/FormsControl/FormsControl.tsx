import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import styles from "../../common/FormsControl/FormsControl.module.css"
import {ReactNode} from "react";

interface Props extends WrappedFieldProps {
    children: ReactNode
}
type PropsType = WrappedFieldProps & {
    chidlren: ReactNode
}
export const Textarea = (props: Props) => {
    const {input, meta ,...restProps} = props;
    return <FormControl {...props}>
        <textarea {...restProps} {...input}/>
    </FormControl>
}

export const Input = (props: Props) => {
    const {input, meta ,...restProps} = props;
    return <FormControl {...props}>
        <input {...restProps} {...input}/>
    </FormControl>
}


export const FormControl = ({input, meta,children,...props}: Props) => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={styles["form-control"] + " "+ (hasError ? styles["error"] : "")}>
            {children}
            {hasError && <p>{meta.error}</p>}
        </div>
    );
};
