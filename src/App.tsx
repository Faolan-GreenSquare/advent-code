import React, { ChangeEvent } from "react"

export const App = () => {
  const [output, setOutput] = React.useState(0);
  const [input, setInput] = React.useState('');

  const handleOnFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (typeof (reader.result) == 'string') {
        setInput(reader.result);
      }
    }
  }

  React.useEffect(() => {
    setOutput(executeCalculations(input))
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

const executeCalculations = (input: string): number => {
  if(!input){
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;

  for(let i = 0; i < rows.length; i=i+3) {
    for(let j = 0; j < rows[i].length; j++){
      if(rows[i+1].includes(rows[i][j]) && rows[i+2].includes(rows[i][j])){
        if (rows[i][j] === rows[i][j].toUpperCase()){
          output = output + (rows[i][j].charCodeAt(0) - 38);
        } else {
          output = output + (rows[i][j].charCodeAt(0) - 96);
        }
        break;
      }
    }
  }

  return output;  
}
