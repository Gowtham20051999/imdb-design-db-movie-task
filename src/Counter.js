import { useState } from "react";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

export function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  return (
    <div className="counterContainer">
      {/* <div className="likesDiv"> */}
      <div className = "likeEnclosure">
        <Badge badgeContent={like} color="primary">
          <IconButton 
            aria-label="Like" 
            className = "likeButton" 
            color = "primary" 
            size="small"
            onClick={() => setLike(like + 1)} >
            👍
          </IconButton>
          
        </Badge>
      </div>
      <div className = "dislikeEnclosure">
        <Badge badgeContent={disLike} color="error">
          <IconButton 
            aria-label="dislike" 
            size="small"
            className = "dislikeButton" 
            onClick={() => setDisLike(disLike + 1)} >
            👎
          </IconButton>
          
        </Badge>
      </div>
      

      {/* <ThumbUpIcon className="likeButton" onClick={() => setLike(like + 1)} />
        <span> {like}</span> */}
      {/* </div> */}
      
      {/* <button
        className="likeButton"
        onClick={() => setLike(like + 1)}
      >
        👍 {like}
      </button> */}
      {/* <div className="disLikesDiv">
        <ThumbDownAltIcon className="dislikeButton" onClick={() => setDisLike(disLike + 1)}/>
        <span>{disLike}</span>
      </div> */}
      {/* <button
        className="dislikeButton"
        onClick={() => setDisLike(disLike + 1)}
      >
        👎 {disLike}
      </button> */}
    </div>
  );
}
