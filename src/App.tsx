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
  let start:number[] = [];
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
      if(rows[i][j] === 'S' || rows[i][j] === 'a'){
        start.push(i * rows[i].length + j);
      }
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


  const bfs = (graph: number[][], start: number, end: number): number => {
    const visited: boolean[] = [];
    visited[start] = true;
    const queue = [start];
    const edges: number[] = [];
    edges[start] = 0;

    while (queue.length !== 0) {
      const current = queue.shift();
      if (current === end) {        
        return edges[end];
      }
      if (current === undefined) {
        continue;
      }
      for (let i = 0; i < graph[current].length; i++) {
        if (!visited[graph[current][i]]) {
          visited[graph[current][i]] = true;
          queue.push(graph[current][i]);
          edges[graph[current][i]] = edges[current] + 1;
        }
      }
    }
    return 0;
  }

  for (let i = 0; i < start.length; i++) {
    const tempValue = bfs(graph, start[i], end);
    if(tempValue > 0){
      console.log(`Start ${i} / ${start.length}: ${tempValue} steps`);
      output = tempValue < output || output == 0 ? tempValue : output;
    }
  }

  return output;
}