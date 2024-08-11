import React, { useRef, useState } from 'react';
import {ColorRing} from 'react-loader-spinner';
import axios from 'axios';
import Invoice from '../components/Invoice';


const  Home=()=> {
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);


  const handleDropFileChange = async (newFile) => {
    setIsLoading(true);
     
     const forData = new FormData();
     forData.append('file',newFile);
     try {
       const response =await axios.post('http://localhost:3000',forData,{
         headers:{
           'Content-Type': 'multipart/form-data'
         }
   
       });
       setIsLoading(false);
       setPdfText(response.data.details);
       console.log(response.data.details);
     } catch (error) {
       console.log('Error uploading file:', error);
     }   
   };
  const handleFileChange = async (event) => {
   setIsLoading(true);
    const file = event.target.files[0];
    setFileName(file.name);
    const forData = new FormData();
    forData.append('file',file);
    try {
      const response =await axios.post('http://localhost:3000',forData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
  
      });
      setIsLoading(false);
      setPdfText(response.data.details);
      console.log(response.data.details);
    } catch (error) {
      console.log('Error uploading file:', error);
    }   
  };

  const handleDragOver=(event)=>{
    event.preventDefault();
   setIsDragOver(true);
  }
  const handleDragLeave=(event)=>{
    event.preventDefault();
   setIsDragOver(false);
  }
  const handleDrop=(event)=>{
    event.preventDefault();
   setIsDragOver(false);
   const newFile = event.dataTransfer.files[0];
   console.log(newFile, "knvekghjnrgbrjende");
   if(newFile){
   setFileName(newFile.name);
   handleDropFileChange(newFile);
   }
  }
  const handleBrowseClick = ()=>{
    fileInputRef.current.click();
  } 

  return (
    <div className="flex h-full items-center flex-col w-full gap-10">
      <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='bg-slate-200 border-gray-400 border-2 border-dashed h-[300px] w-1/2 rounded-2xl gap-5 flex flex-col items-center justify-center'>
              <input className='hidden' ref={fileInputRef}  type="file" onChange={handleFileChange} accept=".pdf" />  
            {fileName ? <p className='text-lg'>{fileName}</p>:<span className='text-lg'>Drag and Drop  Or</span>}
    {fileName ? null :   <button type="button" onClick={handleBrowseClick} className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Browse File</button>
  }
    </div>
    {isLoading && <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['blue','blue','blue','blue','blue']}
  />}
     {pdfText && <Invoice details={pdfText}/> }
    </div>
  );
}

export default Home;
