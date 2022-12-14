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
    setOutput(execute(input));
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

const execute = (input: string): number => {
  if (!input) { return 0; }
  const rows = input.split('\r\n');
  let output = 0;

  const strConvert = "abcdefghijklmnopqrstuvwxyz";
  let start = 0;
  let end = 0;
  let graph: number[][] = [];

  const getValue = (rowValue: string): number => {
    return rowValue === 'S'
      ? strConvert.indexOf('a')
      : rowValue === 'E'
        ? strConvert.indexOf('z')
        : strConvert.indexOf(rowValue);
  }

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {

      // Handle Start and End positions
      start = rows[i][j] === 'S' ? i * rows[i].length + j : start;
      end = rows[i][j] === 'E' ? i * rows[i].length + j : end;

      // Set up Graph and it's value
      const currentPos = i * rows[i].length + j;
      graph[currentPos] = [];
      const value = getValue(rows[i][j]) + 2;

      // Check North i--
      if (i !== 0 && getValue(rows[i - 1][j]) < value)
        graph[currentPos].push((i - 1) * rows[i].length + j);

      // Check South i++
      if (i !== rows.length - 1 && getValue(rows[i + 1][j]) < value)
        graph[currentPos].push((i + 1) * rows[i].length + j);

      // Check West j--
      if (j !== 0 && getValue(rows[i][j - 1]) < value)
        graph[currentPos].push(i * rows[i].length + j - 1);

      // Check East j++
      if (j !== rows[i].length - 1 && getValue(rows[i][j + 1]) < value)
        graph[currentPos].push(i * rows[i].length + j + 1);
    }
  }
  
  return output;
}