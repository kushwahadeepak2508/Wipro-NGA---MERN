import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
const schema=Yup.object().shape({
  email:Yup.string().email().required(),
  password:Yup.string().min(6).required()
});
export default function FormikLogin(){
  return (
    <Formik initialValues={{email:'',password:''}} validationSchema={schema}
      onSubmit={v=>{console.log(v);alert('Submitted')}}>
      <Form>
        <div><label>Email</label><Field name="email" /><ErrorMessage name="email" /></div>
        <div><label>Password</label><Field name="password" type="password" /><ErrorMessage name="password" /></div>
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}