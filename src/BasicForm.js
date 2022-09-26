import {useFormik} from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email : yup.string().min(5,"The email must have 5 characters").email().required(),
  password : yup.string().min(8,"The password must have 8 characters").required().max(12)
}
);

export function BasicForm() {
  // instead of using formik every where we can destructur formik object like below and can avoid formik
  // const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
  const formik = useFormik({
    initialValues : {email : "atrr", password : ""},
    validationSchema : formValidationSchema,
    onSubmit : (values)=>console.log(values)
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Basic Form</h1>
      <label htmlFor="name" >Name</label>
      <input type="text" 
              placeholder="Enter name" 
              id="name"/>
      <label htmlFor="email" >Email</label>
      <input value = {formik.values.email} 
              type="email" 
              placeholder="Enter Email" 
              id="email"
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              />
      {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
      <label htmlFor="password">Password</label>
      <input value = {formik.values.password}  
              type="password" 
              placeholder="Enter Password" 
              id="password"
              onChange={formik.handleChange}
              onBlur = {formik.handleBlur}
              />
      {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
      <button type="submit">Submit</button>
    </form>
  );
}
