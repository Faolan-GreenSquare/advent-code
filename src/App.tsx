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

  try {
    // Build grid
    let current_x = 0;
    let current_y = 0;
    let max_x = 0;
    let min_x = 0;
    let max_y = 0;
    let min_y = 0;
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

    // Generate Game Board
    const gridHeight = max_y - min_y;
    const gridWidth = max_x - min_x;
    const gridPositions: Record<number, boolean> = {};
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        gridPositions[i * gridWidth + j] = false;
      }
    }

    const isNeighbour = (position: number, comparitor: number): boolean => {
      const diff_x = (position % gridWidth) - (comparitor % gridWidth);
      const diff_y = (Math.floor(position / gridWidth)) - (Math.floor(comparitor / gridWidth));
      return diff_x >= -1 && diff_x <= 1 && diff_y >= -1 && diff_y <= 1
    }

    const convertToCoordinates = (position: number): number[] => {
      const x = position % gridWidth;
      const y = Math.floor(position / gridWidth);
      return [x, y];
    }

    const convertToPosition = (coordinates: number[]): number => {
      const x = coordinates[0];
      const y = coordinates[1];
      return (y * gridWidth) + x;
    }

    // Follow Head 
    let oldPosition = 0;
    let headPosition = 0;
    let tailPosition = 0;
    gridPositions[tailPosition] = true;
    for (let i = 0; i < rows.length; i++) {
      const instruction = rows[i].split(' ')[0];
      const moves = parseInt(rows[i].split(' ')[1]);
      for (let j = 1; j <= moves; j++) {
        const headCoordinates = convertToCoordinates(headPosition);
        const x = headCoordinates[0];
        const y = headCoordinates[1];
        switch (instruction.toUpperCase()) {
          case "U": // Y = [1]
            headCoordinates[1] = y + 1;
            break;
          case "D": // Y = [1]
            headCoordinates[1] = y - 1;
            break;
          case "R": // X = [0]
            headCoordinates[0] = x + 1;
            break;
          case "L": // X = [0]
            headCoordinates[0] = x - 1;
            break;
        }

        console.log(`Moving ${j}/${moves}: ${instruction} from (${convertToCoordinates(oldPosition)[0]}, ${convertToCoordinates(oldPosition)[1]} to ${headCoordinates[0]}, ${headCoordinates[1]}`);
        oldPosition = headPosition;
        headPosition = convertToPosition(headCoordinates);
        if (!isNeighbour(tailPosition, headPosition)) {
          tailPosition = oldPosition;
          gridPositions[tailPosition] = true;
        }
      }
    }
    
    // Count results
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        if(!!gridPositions[i * gridWidth + j]){
          output++;
        }
      }
    }

    console.table(gridPositions);
  } catch (e) {
    console.log(e)
    debugger;
  }
  return output;
}