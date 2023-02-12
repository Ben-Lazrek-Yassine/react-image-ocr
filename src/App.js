import "./App.css";
import { useState } from "react";
import Tesseract from 'tesseract.js';

function App() {
  
  const handleClick = () => {
      setIsLoading(true);
      Tesseract.recognize(img,"eng",{
        logger: (m) => {
          console.log(m);  
        if (m.status==="recognizing text") {
          setProgress(parseInt(m.progress * 100))
        }
        },
      }).then(({data: {text }}) => {  
        setText(text);
        setIsLoading(false);
      });
    }


const [isLoading, setIsLoading] = useState(false);
const [text, setText] = useState("");
const [img, setImg] = useState("");
const [progress, setProgress ] = useState(0);


  return (
    <div className="container" style={{height:"100vh"}}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className="mt-5 mb-5 pb-5">Image To text</h1>}       
          {!isLoading &&  !text && (
            <>  
              <input 
              type="file" 
              className="form-control"
               onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))
              } 
              />
              <input type="button" value="Convert" className="form-control btn btn-primary mt-4" onClick={handleClick}/>
            </>
          )}

          {
            isLoading && (
              <>
              <p className="text-center"> Converting : {progress}%</p>
              </>
            )
          }

          {
            !isLoading && text && (
              <>
              <textarea className="text-center" value={text} rows="15" onChange={(e) =>
              setText(e.target.value)}></textarea>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
