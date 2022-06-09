import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Home = () => {
 
  const [image, setImage] = useState('');
  const [imageurl, setImageurl] = useState([]);
  const [data, setData] = useState("");



const handleimagechange = (e) => {

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
// resize image  to fit in the image box
        
       // img.src = reader.result;
      

      setImage(reader.result);
      console.log(reader.result);
    }
    reader.readAsDataURL(file);
  
  

}




  // send images to server upolad rouetr

  const upload = async (req, res) => {
    try {
      const response = await axios.post("http://localhost:5000/api/upload", {
        image: image,
      });
      console.log(response.data);
      setData(response.data.images);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="  home-contaioner">

<input
onChange={handleimagechange}

type="file" multiple='false' />


<button
onClick={upload}
>send  to server</button>


      </div>
  );
};

export default Home;
