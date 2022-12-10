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
    const positions: Record<string, boolean> = { "0,0": true };
    let tail_x = 0;
    let tail_y = 0;
    let head_x = 0;
    let head_y = 0;
    let rope_x = 0;
    let rope_y = 0;

    for (let i = 0; i < rows.length; i++) {
      const instruction = rows[i].split(' ')[0];
      const moves = parseInt(rows[i].split(' ')[1]);
      for (let j = 1; j <= moves; j++) {
        switch (instruction.toUpperCase()) {
          case "U": // Y + 1
            head_y++;
            break;
          case "D": // Y - 1
            head_y--;
            break;
          case "R": // X + 1
            head_x++;
            break;
          case "L": // X - 1
            head_x--;
            break;
        }
        const diff_x = tail_x - head_x;
        const diff_y = tail_y - head_y;
        if (!(diff_x >= -1 && diff_x <= 1 && diff_y >= -1 && diff_y <= 1)) {
          tail_x = rope_x;
          tail_y = rope_y;
          positions[`${tail_x},${tail_y}`] = true;
        }
        rope_x = head_x;
        rope_y = head_y;
      }
    }
    for (let x of Object.keys(positions)){
      if(!!x){
        output++;
      }
    }
  } catch (e) {
    console.log(e)
    debugger;
  }
  return output;
}