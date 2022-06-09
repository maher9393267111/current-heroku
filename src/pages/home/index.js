import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Home = () => {
  const [uploadClass, setUploadClass] = useState("class-images");
  const [images, setImages] = useState([]);
  const [imageurl, setImageurl] = useState([]);
  const [data, setData] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: 40000000000000000000000000,
    maxFiles: 50,
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const imgUrl = reader.result;
          setImages((s) => [imgUrl, ...s]);
          console.log(images);
        };
        reader.readAsDataURL(file);
       // setImageurl((s) => [file, ...s]);
        // console.log(imageurl);
      });
      setUploadClass("class-images");
    },
    onDragEnter: () => {
      setUploadClass("class-images-uploading");
    },
    onDragLeave: () => {
      setUploadClass("class-images");
    },
  });



// send images to server upolad rouetr

const upload = async (req, res) => {
    try {
       const response = await axios.post('http://localhost:5000/api/upload', {
        images: images
        });
        console.log(response.data);
        setData(response.data.images);   
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}





  return (
    <div className="class">
      <div
        {...getRootProps()}
        className={uploadClass}
        style={{ background: images.length === 0 ? "none" : "white" }}
      >
        <input {...getInputProps()} />
        {images.length === 0 ? (
          <p>Drag 'n' drop some files here, or click to select files</p>
        ) : (
          <div
            className="  ml-20  mt-12"
            style={{ display: "flex", gap: "10px" }}
          >
            {images.map((img, i) => (
              <div className="img-div" key={i}>
                <img style={{ width: "100px", height: "80px" }} src={img}></img>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="img-delete-button" onClick={() => setImages([])}>
        X
      </button>

        <button
        onClick={upload}

        > send</button>

        <div>

<img src={data[0]} alt="" />


        </div>
    </div>
  );
};

export default Home;
