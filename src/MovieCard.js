import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Counter } from './Counter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API } from "./global";



export function MovieCard({ img, name, rating, content, id, mveinf, setmovieInfo, getMovieAPI }) {
  const styles = {
    color: rating > 8 ? "green" : "red"
  };
  const [show, setShow] = useState(true);
  const paraStyles = {
    display: show ? "block" : "none"
  };
  const navigate = useNavigate();
  return (
    <Card className = "card" variant="outlined" >
      <div className="movieCard">
        <img className="movieImage" src={img} alt={name} />
        <CardContent>
          <div className="movieCredentials">
            <span className="movieName">{`${name}`}
            <IconButton 
              aria-label="Movie Details"
              size="small" 
              className = "infoIcon"
              color = "primary" 
              onClick={() => {
                navigate(`/movies/${id}`);
              }} >
              <InfoIcon />
            </IconButton>
            
              <IconButton 
              aria-label="Movie summary" 
              size="small"
              color = "primary" 
              onClick={() => {
                return setShow(!show);}} >
                {show ? <KeyboardControlKeyIcon /> : <ExpandMoreIcon />}
              </IconButton>
            
            </span>
            <span style={styles} className="movieRating">⭐ {rating} </span>
          </div>
          <div style={paraStyles} className="movieDescription">{content}</div>
        </CardContent>
        <CardActions className = "cardActionsMovieCard">
          <Counter />
          <IconButton 
            aria-label="Movie Edit"
            size="small" 
            className = "editIcon"
            style = {{marginLeft : "auto"}}
            color = "secondary" onClick = {()=> {
              navigate(`/movies/edit/${id}`)
          }}>
            <EditIcon fontSize="small !important" />
          </IconButton>
          <IconButton 
            aria-label="Movie Delete"
            size="small" 
            className = "deleteIcon"
            color = "error" onClick = {()=> {
              fetch(`${API}/movies/${id}`,{method:"DELETE"})
              .then(()=>getMovieAPI());
          }}>
            <DeleteIcon fontSize="small !important" />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );

}
