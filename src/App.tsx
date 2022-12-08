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
    setOutput(executePartOne(input))
    //setOutput(executePartTwo(input))
  }, [input]);

  return (
    <div>
      <div>Select File:</div>
      <div><input type='file' onChange={handleOnFileChange}></input></div>
      <div>Output: {output}</div>
    </div>
  )
}

interface tree {
  value: number;
  isVisible: boolean;
}

const executePartOne = (input: string): number => {
  if (!input) {
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;
  const forest: tree[][] = [];
  try {

    for (let i = 0; i < rows.length; i++) {
      forest[i] = []
      for (let j = 0; j < rows[i].length; j++) {
        forest[i][j] = {
          value: parseInt(rows[i][j]),
          isVisible: false
        } as tree;
      }
    }
    debugger;

    // check Left to Right
    for (let i = 0; i < forest.length; i++) {
      for (let j = 0; j < forest[i].length; j++) {
        let highestPoint = -1;
        if (forest[i][j].value > highestPoint) {
          forest[i][j].isVisible = true;
          highestPoint = forest[i][j].value;
        }
      }
    }

    debugger;

    // check Right to Left
    for (let i = 0; i < forest.length; i++) {
      for (let j = forest[i].length; j > 0; j--) {
        let highestPoint = -1;
        if (forest[i][j].value > highestPoint) {
          forest[i][j].isVisible = true;
          highestPoint = forest[i][j].value;
        }
      }
    }

    // check Up to Down
    for (let i = 0; i < forest.length; i++) {
      for (let j = 0; j < forest[i].length; j++) {
        let highestPoint = -1;
        if (forest[j][i].value > highestPoint) {
          forest[j][i].isVisible = true;
          highestPoint = forest[j][i].value;
        }
      }
    }

    // check Down to Up
    for (let i = 0; i < forest.length; i++) {
      for (let j = forest[i].length - 1; j > 0; j--) {
        let highestPoint = -1;
        if (forest[j][i].value > highestPoint) {
          forest[j][i].isVisible = true;
          highestPoint = forest[j][i].value;
        }
      }
    }

    // count all isVisible trees
    for (let i = 0; i < forest.length; i++) {
      for (let j = 0; j < forest[i].length; j++) {
        if (forest[i][j].isVisible) {
          output++;
        }
      }
    }
  } catch (e) {
    console.log(e);
    debugger;
  }

  return output;
}

const executePartTwo = (input: string): number => {
  if (!input) {
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;
  return output;

}