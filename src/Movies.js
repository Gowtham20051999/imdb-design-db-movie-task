import { useEffect ,useState} from 'react';
import { API } from './global';
import { MovieCard } from './MovieCard';

export function Movies() {
  
  const[movieInfo,setmovieInfo]=useState([]);

  function getMovieAPI(){
    fetch(`${API}/movies`)
    .then((data)=>data.json())
    .then((mvs)=>setmovieInfo(mvs));
  }

  useEffect(()=>{
    getMovieAPI();
  },[]);

  return (
    <div className="movieList">
      {movieInfo.map((value, index) => {
        return <MovieCard key={value._id} id={value._id} img={value.imgg} name={value.namee} rating={value.ratingg} 
                          content={value.contentt} mveinf={movieInfo} setmovieInfo={setmovieInfo} getMovieAPI = {getMovieAPI} />;
      })}
    </div>
  );
}
