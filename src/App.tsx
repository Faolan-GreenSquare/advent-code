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
    const rope: Record<number, string> = { 0: '0,0', 1: '0,0', 2: '0,0', 3: '0,0', 4: '0,0', 5: '0,0', 6: '0,0', 7: '0,0', 8: '0,0', 9: '0,0' };


    for (let i = 0; i < rows.length; i++) {
      const instruction = rows[i].split(' ')[0];
      const moves = parseInt(rows[i].split(' ')[1]);
      let temp_x = 0;
      let temp_y = 0;

      for (let j = 1; j <= moves; j++) {
        let head_x = parseInt(rope[0].split(',')[0]);
        let head_y = parseInt(rope[0].split(',')[1]);

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
        rope[0] = `${head_x},${head_y}`;
        console.table(rope);
        for (let k = 1; k < 10; k++) {
          let x = parseInt(rope[k].split(',')[0]);
          let y = parseInt(rope[k].split(',')[1]);
          const diff_x = parseInt(rope[k - 1].split(',')[0]) - x;
          const diff_y = parseInt(rope[k - 1].split(',')[1]) - y;

          if (Math.abs(diff_x) <= 1 && Math.abs(diff_y) <= 1) {
            break;
          }
          if (diff_x > 0)
            x++;
          if (diff_x < 0)
            x--;
          if (diff_y > 0)
            y++;
          if (diff_y < 0)
            y--;

          rope[k] = `${x},${y}`;

          if (k === 9) {
            positions[`${x},${y}`] = true;
          }
        }
      }
    }
    Object.keys(positions).forEach((x) => {
      output++;
    });
  } catch (e) {
    console.log(e)
    debugger;
  }
  return output;
}