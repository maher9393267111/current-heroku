import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Home = () => {
    const [uploadClass, setUploadClass] = useState('class-images');
    const [images, setImages] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxSize: 40000000000000000000000000,
        maxFiles: 50,
        multiple: true,
        onDrop: (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const imgUrl = reader.result;
                    setImages(s => [imgUrl, ...s]);
                }
                reader.readAsDataURL(file);
            });
            setUploadClass('class-images');
        },
        onDragEnter: () => {
            setUploadClass('class-images-uploading');
        },
        onDragLeave: () => {
            setUploadClass('class-images');
        }
    });

    return (
        <div className='class'>
            <div {...getRootProps()} className={uploadClass}
                style={{ background: images.length === 0 ? 'none' : 'black' }}>
                <input {...getInputProps()} />
                {
                    images.length === 0 ?
                        (<p>Drag 'n' drop some files here, or click to select files</p>) :
                        (

                            images.map((img, i) => (
                                <div className='img-div' key={i}>
                                    <img src={img}></img>
                                </div>
                            ))

                        )

                }
            </div>
            <button className='img-delete-button' onClick={() => setImages([])}>X</button>
        </div>
    )
};



export default Home;