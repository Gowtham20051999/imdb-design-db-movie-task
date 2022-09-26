import { useParams, useNavigate} from "react-router-dom";
import { useEffect ,useState} from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { API } from "./global";

export function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const[movie,setMovie]=useState({});

  function getSingleMovieAPI(){
    fetch(`${API}/movies/${id}`)
    .then((data)=>data.json())
    .then((mv)=>setMovie(mv));
  }

  useEffect(()=>{
    getSingleMovieAPI();
  },[]);

  const styles = {
    color: movie.ratingg > 8 ? 'green' : 'red'
  };
  return (
    <div className="movieDetailsContainer">
      <iframe
        width="100%"
        height="835px"
        src={movie.trailerr}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe>
      <div className="movieCredentialsContainer">
        <div className="movieCredentials">
          <h2 className="movieName">{movie.namee}</h2>
          <p className='movieRating' style={styles}>⭐ {movie.ratingg}</p>
        </div>
        <p className='movieDescription'>{movie.contentt}</p>

        <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} onClick={() => {
          return navigate(-1);
        }}
        >
          Back</Button>
      </div>
    </div>
  );
}
