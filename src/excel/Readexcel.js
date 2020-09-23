import React, {useState} from 'react';
import XLSX from 'xlsx';

function Readexcel() {
  const [newdata, setNewdata] = useState();
  const handleChange = (e) =>{
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      var bufferArray = e.target.result;
      var workbook = XLSX.read(bufferArray, {
            type: 'buffer'
        });
      var wsname  = workbook.SheetNames[0];
      var ws = workbook.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, {header:1});
      /* Update state */
      setNewdata(data);
    };
  }
  return (
    <div className="App">
      <p>This is my excel</p>
      <input
       type="file"
       onChange={handleChange}
     />
     <h2>Load data excel</h2>
     <p>{newdata ? newdata : ''}</p>
    </div>
  );
}

export default Readexcel;
