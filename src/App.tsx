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

  interface mountain {
    height: number;
    adj: number[];
  }

  let startV = 0;
  let endV = 0;
  const range: Record<number, mountain> = {};
  let heightConversion = "abcdefghijklmnopqrstuvwxyz";

  // Build Mountain Range
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === 'S') {
        startV = i * rows[i].length + j % rows[i].length;
      }
      else if (rows[i][j] === 'E') {
        endV = i * rows[i].length + j % rows[i].length;
      }
      range[i * rows[i].length + j % rows[i].length] = {
        height: rows[i][j] === 'S'
          ? 0
          : rows[i][j] === 'E'
            ? 25
            : heightConversion.indexOf(rows[i][j]),
        adj: []
      };
    }
  }

  // Add Adjacencies
  for (let i = 0; i < Object.keys(range).length; i++) {
    const x = i % rows[0].length;
    const y = Math.floor(i / rows[0].length);

    // Check North y--
    if (y !== 0 && range[(y - 1) * rows[0].length + x].height <= range[i].height + 1)
      range[i].adj.push((y - 1) * rows[0].length + x);

    // Check South y++
    if (y !== rows.length - 1 && range[(y + 1) * rows[0].length + x].height <= range[i].height + 1)
      range[i].adj.push((y + 1) * rows[0].length + x);

    // Check West x--
    if (x !== 0 && range[y * rows[0].length + x - 1].height <= range[i].height + 1)
      range[i].adj.push(y * rows[0].length + x - 1);

    // Check East x++
    if (x !== rows[0].length - 1 && range[y * rows[0].length + x + 1].height <= range[i].height + 1)
      range[i].adj.push(y * rows[0].length + x + 1);
  }

  
  return output;
}