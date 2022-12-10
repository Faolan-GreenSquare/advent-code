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
  try {
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

    const gridHeight = max_y + min_y;
    const gridWidth = max_x + min_x;
    const board: boolean[][] = [];

    for (let i = 0; i < gridWidth; i++) {
      board[i] = [];
      for (let j = 0; j < gridHeight; j++) {
        board[i][j] = false;
      }
    }

    let head_y = gridHeight-1;
    let tail_y = gridHeight-1;
    let tail_x = 0;
    let head_x = 0;
    board[tail_x][tail_y] = true;
    // workout
    for (let i = 0; i < rows.length; i++) {
      const instruction = rows[i].split(' ')[0];
      const moves = parseInt(rows[i].split(' ')[1]);
      for (let j = 0; j < moves; j++) {
        const old_x = head_x
        const old_y = head_y
        switch (instruction.toUpperCase()) {
          case "U":
            head_y = head_y - 1;
            break;
          case "D":
            head_y = head_y + 1;
            break;
          case "R":
            head_x = head_x + 1;
            break;
          case "L":
            head_x = head_x - 1;
            break;
        }
        // is H far enough away from T to warrant T moving
        // if Yes, T = H old position
        const diff_x = head_x - tail_x;
        const diff_y = head_y - tail_y;
        if (!(diff_x >= -1 && diff_x <= 1 && diff_y >= -1 && diff_y <= 1)) {
          tail_x = old_x;
          tail_y = old_y;
          board[tail_x][tail_y] = true;
        }
      }

      for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
          if (!!board[i][j]) {
            output++;
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    debugger;
  }
  

  return output;
}