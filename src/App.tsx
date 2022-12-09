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

const execute = (input: string): number => {
  if (!input) { return 0; }
  const rows = input.split('\r\n');
  let output = 0;
  let current_x = 0;
  let current_y = 0;
  let max_x = 0;
  let min_x = 0;
  let max_y = 0;
  let min_y = 0;

  // Build grid
  for (let i = 0; i < rows.length; i++) {
    const instruction = rows[i].split(' ')[0];
    const moves = parseInt(rows[i].split(' ')[1]);
    switch (instruction.toUpperCase()) {
      case "U":
        current_y = current_y + moves;
        max_y = current_y > max_y ? current_y : max_y;
        break;
      case "D":
        current_y = current_y - moves;
        min_y = current_y < min_y ? current_y : min_y;
        break;
      case "R":
        current_x = current_x + moves;
        max_x = current_x > max_x ? current_x : max_x;
        break;
      case "L":
        current_x = current_x - moves;
        min_x = current_x < min_x ? current_x : min_x;
        break;
    }
  }

  const gridHeight = max_y - min_y;
  const gridWidth = max_x - min_x;
  const board: boolean[][] = [];

  for (let i = 0; i < gridHeight; i++) {
    board[i] = [];
    for (let j = 0; j < gridWidth; j++) {
      board[i][j] = false;
    }
  }

  let head_y = gridHeight;
  let tail_y = gridHeight;
  let tail_x = 0;
  let head_x = 0;  

  // workout
  for (let i = 0; i < rows.length; i++) {
    const instruction = rows[i].split(' ')[0];
    const moves = parseInt(rows[i].split(' ')[1]);
    switch (instruction.toUpperCase()) {
      case "U":
        head_y = head_y - moves;
        break;
      case "D":
        head_y = head_y + moves;
        break;
      case "R":
        head_x = head_x + moves;
        break;
      case "L":
        head_x = head_x - moves;
        break;
    }
    
  }

  return output;
}