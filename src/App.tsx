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
    setOutput(executePartOne(input));
    //setOutput(executePartTwo(input));
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

const executePartOne = (input: string): number => {
  if(!input){
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;

  return output;  
}

const executePartTwo = (input: string): number => {
  if(!input){
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;

  return output;  
}