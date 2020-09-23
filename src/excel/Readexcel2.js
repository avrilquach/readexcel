import React, {useCallback, useState}from 'react';
import {useDropzone} from 'react-dropzone'
import XLSX from 'xlsx';

function Readexcel2 (){
  const [newdata, setNewdata] = useState();
  const onDrop = useCallback((acceptedFiles) => {
   acceptedFiles.forEach((file) => {
     const reader = new FileReader()
     reader.onabort = () => console.log('file reading was aborted')
     reader.onerror = () => console.log('file reading has failed')
     reader.onload = () => {
     // Do whatever you want with the file contents
     const bufferArray = reader.result
     var workbook = XLSX.read(bufferArray, {
           type: 'buffer'
       });
     var wsname  = workbook.SheetNames[0];
     var ws = workbook.Sheets[wsname];
     /* Convert array of arrays */
     const data = XLSX.utils.sheet_to_csv(ws, {header:1});
     /* Update state */
     setNewdata(data);
     }
     reader.readAsArrayBuffer(file)
   })

 }, [])
 const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="App">
      <p>This is my excel</p>
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
     <h2>Load data excel</h2>
     <p>{newdata ? newdata : ''}</p>
    </div>
  );
}

export default Readexcel2;
