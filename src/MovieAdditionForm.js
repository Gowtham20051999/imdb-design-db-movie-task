import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import * as yup from "yup";
import { API } from "./global";


const formValidationSchema = yup.object({
  namee : yup.string().required("Please add name"),
  imgg : yup.string().required("Please add image source"),
  ratingg : yup.number().required("Please add rating").max(10,"Provide rating from 1-10").min(1,"Provide rating from 1-10"),
  contentt : yup.string().required("Please add summary").min(20,"Minimum 20 characters"),
  trailerr : yup.string().required("Please add trailer source")
}
);


export function MovieAdditionForm() {

  const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues : {
                      namee: "",
                      imgg: "",
                      ratingg: "",
                      contentt: "",
                      trailerr: ""
                    },
    validationSchema : formValidationSchema,
    onSubmit : (values)=>addMovieAPI(values)
  })

  // const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState("");
  // const [content, setContent] = useState("");
  // const [trailer, setTrailer] = useState("");
  const navigate = useNavigate();
  // const addMovie = () => {
    // const newMovie = {
    //   namee: name,
    //   imgg: image,
    //   ratingg: rating,
    //   contentt: content,
    //   trailerr: trailer
    // };
  //   addMovieAPI(newMovie);
  // };

  function addMovieAPI(newMovie){
    fetch(`${API}/movies`,
      {method:"POST",
      body : JSON.stringify(newMovie),
      headers : {"Content-Type":"application/json"}
      }
    ).then(()=>navigate("/movies"))
      // .then((data)=>data.json())
      // .then((mvs)=>setmovieInfo(mvs));
  }

  // useEffect(()=>{
  //   addMovieAPI();
  // },[]);


  return (
    <form onSubmit={handleSubmit} className="formSection">
      
      <TextField label="Name" variant="standard"  name="namee" value={values.namee} onChange={handleChange} onBlur = {handleBlur}  error={touched.namee && errors.namee} id="filled-error-helper-text" helperText={touched.namee && errors.namee}/>
      {/* {touched.namee && errors.namee} */}
      <TextField label="Poster" variant="standard" name="imgg" value={values.imgg} onChange={handleChange} onBlur = {handleBlur}  error={touched.imgg && errors.imgg}  id="filled-error-helper-text" helperText={touched.imgg && errors.imgg}/>
      {/* {touched.imgg && errors.imgg} */}
      <TextField label="Rating" variant="standard" className="rating input"  name="ratingg" value={values.ratingg} onChange={handleChange} onBlur = {handleBlur}  error={touched.ratingg && errors.ratingg}  id="filled-error-helper-text" helperText={touched.ratingg && errors.ratingg}/>
      {/* {touched.ratingg && errors.ratingg} */}
      <TextField label="Summary" variant="standard" className="summary input" name="contentt" value={values.contentt} onChange={handleChange} onBlur = {handleBlur}  error={touched.contentt && errors.contentt}  id="filled-error-helper-text" helperText={touched.contentt && errors.contentt} />
      {/* {touched.contentt && errors.contentt} */}
      <TextField label="Trailer" variant="standard" className="trailer input" name="trailerr" value={values.trailerr} onChange={handleChange} onBlur = {handleBlur}  error={touched.trailerr && errors.trailerr}  id="filled-error-helper-text" helperText={touched.trailerr && errors.trailerr}/>
      {/* {touched.trailerr && errors.trailerr} */}
      <Button variant="outlined" className="addMovieButton" type="submit">Add Movie</Button>
    </form>
  );
}
