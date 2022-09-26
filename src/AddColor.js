 import {useState} from 'react';
 import Button from '@mui/material/Button';
 import TextField from '@mui/material/TextField';

 function AddColor(){
     const[color,setColor] = useState("deepskyblue")
     const initialColor = ["red","orange","yellow"];
     const[addColor,setAddColor] = useState(initialColor)
     
     const styles = {backgroundColor : color};
    return(
        <div className="colorGame">
            <div className="addColorEnclosure">
                <TextField style={styles} className="addColorField" label="Enter a Color" variant="outlined"  value = {color} onChange={(evt) => {
                    setColor(evt.target.value)
                    }} 
                />
                <Button className="addColorButton" variant="outlined" onClick={() => {
                    return setAddColor([...addColor,color]);
                    }}
                >
                    Add Color
                </Button>
            </div>
            {addColor.map((value,index)=>{
                return <ColorBox key = {index} color = {value}/>
            })}
            
        </div>
    )
 }
 function ColorBox(props){
    const styles={
         backgroundColor : props.color,
         height : "25px",
         width : "250px",
         marginTop : "10px"
    }
     
    return <div style = {styles}></div>
     
 }
export {AddColor};