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
  const cycleOutputs: Record<number, number> = {};
  let output = 0;
  let readLine = 0;
  let delayUntil = 1;
  let x = 1;

  try {

    for (let c = 1; c <= 220 && readLine < rows.length; c++) {
      cycleOutputs[c] = cycleOutputs[c] ? cycleOutputs[c] + x : x;
      x = cycleOutputs[c];
      if (delayUntil !== c) {
        continue;
      }
      const instruction = rows[readLine].split(' ')[0];
      if (instruction === 'noop') {
        delayUntil = c + 1;
      }
      else if (instruction === 'addx') {
        delayUntil = c + 2;
        cycleOutputs[c + 2] = parseInt(rows[readLine].split(' ')[1]);
      }

      console.log(`Cycle Count: ${c} Reading line: ${readLine} ${rows[readLine]} x = ${x} cycle output = ${cycleOutputs[c]}`);

      readLine++;
    }

    output = (cycleOutputs[20] * 20) +
      (cycleOutputs[60] * 60) +
      (cycleOutputs[100] * 100) +
      (cycleOutputs[140] * 140) +
      (cycleOutputs[180] * 180) +
      (cycleOutputs[220] * 220);

  }
  catch (e) {
    console.log(e)
    debugger;
  }
  return output;
}