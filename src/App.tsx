import React from "react"

export const App = () => {
  const [output, setOutput] = React.useState('');
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
    //setOutput(executePartOne(input))
    setOutput(executePartTwo(input))
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

const executePartOne = (input: string): string => {
  if (!input) {
    return '';
  }
  const rows = input.split('\r\n');
  let output = '';
  /*
      [H]         [D]     [P]        
  [W] [B]         [C] [Z] [D]        
  [T] [J]     [T] [J] [D] [J]        
  [H] [Z]     [H] [H] [W] [S]     [M]
  [P] [F] [R] [P] [Z] [F] [W]     [F]
  [J] [V] [T] [N] [F] [G] [Z] [S] [S]
  [C] [R] [P] [S] [V] [M] [V] [D] [Z]
  [F] [G] [H] [Z] [N] [P] [M] [N] [D]
  1   2   3   4   5   6   7   8   9 
  */

  const arr = [
    ['_'], // 0
    ['F', 'C', 'J', 'P', 'H', 'T', 'W'], // 1
    ['G', 'R', 'V', 'F', 'Z', 'J', 'B', 'H'], // 2
    ['H', 'P', 'T', 'R'], // 3
    ['Z', 'S', 'N', 'P', 'H', 'T'], // 4
    ['N', 'V', 'F', 'Z', 'H', 'J', 'C', 'D'], // 5
    ['P', 'M', 'G', 'F', 'W', 'D', 'Z'], // 6
    ['M', 'V', 'Z', 'W', 'S', 'J', 'D', 'P'], // 7
    ['N', 'D', 'S'], // 8
    ['D', 'Z', 'S', 'F', 'M'] // 9
  ]

  for (let i = 10; i < rows.length; i++) {
    const instruction = rows[i].split(' ');
    const qty = parseInt(instruction[1]);
    const source = parseInt(instruction[3]);
    const destination = parseInt(instruction[5]);

    if (qty === 0) {
      continue;
    }

    for (let j = 1; j <= qty; j++) {
      arr[destination][arr[destination].length] = arr[source][arr[source].length - j];
    }

    arr[source].splice(arr[source].length - qty, qty);

  }

  for (let i = 1; i < arr.length; i++) {
    output += arr[i][arr[i].length - 1];
  }

  return output;
}

const executePartTwo = (input: string): string => {
  if (!input) {
    return '';
  }
  const rows = input.split('\r\n');
  let output = '';
  /*
      [H]         [D]     [P]        
  [W] [B]         [C] [Z] [D]        
  [T] [J]     [T] [J] [D] [J]        
  [H] [Z]     [H] [H] [W] [S]     [M]
  [P] [F] [R] [P] [Z] [F] [W]     [F]
  [J] [V] [T] [N] [F] [G] [Z] [S] [S]
  [C] [R] [P] [S] [V] [M] [V] [D] [Z]
  [F] [G] [H] [Z] [N] [P] [M] [N] [D]
  1   2   3   4   5   6   7   8   9 
  */

  const arr = [
    ['_'], // 0
    ['F', 'C', 'J', 'P', 'H', 'T', 'W'], // 1
    ['G', 'R', 'V', 'F', 'Z', 'J', 'B', 'H'], // 2
    ['H', 'P', 'T', 'R'], // 3
    ['Z', 'S', 'N', 'P', 'H', 'T'], // 4
    ['N', 'V', 'F', 'Z', 'H', 'J', 'C', 'D'], // 5
    ['P', 'M', 'G', 'F', 'W', 'D', 'Z'], // 6
    ['M', 'V', 'Z', 'W', 'S', 'J', 'D', 'P'], // 7
    ['N', 'D', 'S'], // 8
    ['D', 'Z', 'S', 'F', 'M'] // 9
  ]

  for (let i = 10; i < rows.length; i++) {
    const instruction = rows[i].split(' ');
    const qty = parseInt(instruction[1]);
    const source = parseInt(instruction[3]);
    const destination = parseInt(instruction[5]);

    if (qty === 0) {
      continue;
    }

    for (let j = 0; j < qty; j++) {
      arr[destination][arr[destination].length] = arr[source][arr[source].length - qty + j];
    }

    arr[source].splice(arr[source].length - qty, qty);

  }

  for (let i = 1; i < arr.length; i++) {
    output += arr[i][arr[i].length - 1];
  }

  return output;
}
