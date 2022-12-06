import React from "react"

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
    setOutput(executepartOne(input))
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

const executepartOne = (input: string): number => {
  if (!input) {
    return 0;
  }
  //const rows = input.split('\r\n');
  let output = 0;

  for (let i = 0; i < input.length; i++) {
    const arr: string[] = [input[i + 0], input[i + 1], input[i + 2], input[i + 3]]
    let isUnique = true;

    arr.forEach((element) => {
      if(!(arr.filter((x) => x != element).length === 3)){
        isUnique = false;
      }
    })
    if (isUnique) {
      output = i + 4;
      break;
    }
  }
  return output;
}
