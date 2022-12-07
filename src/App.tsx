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

interface folder {
  key: string;
  parentFolder: folder | undefined;
  childrenFolders: folder[];
  childrenFiles: file[];
}

interface file {
  key: string;
  size: number;
  location: folder;
}

const executePartOne = (input: string): number => {
  if (!input) {
    return 0;
  }
  const rows = input.split('\r\n');
  let output = 0;
  const rootLocation: folder = {
    key: '/',
    parentFolder: undefined,
    childrenFolders: [],
    childrenFiles: []
  };
  let currentLocation = rootLocation;
  let lastFolderCreated = currentLocation;
  const allFolders: folder[] = [rootLocation];


  rows.forEach((x) => {
    try {
      if (x.includes('$ cd /')) {
        currentLocation = rootLocation;
        lastFolderCreated = currentLocation;
      }

      if (x.includes('$ cd') && !x.includes('..') && !x.includes('/')) {
        const locationKey = x.split(" ")[2];
        currentLocation = currentLocation.childrenFolders[currentLocation.childrenFolders.map(obj => obj.key).indexOf(locationKey)];
      }

      if (x.includes('dir')) {
        const newFolder: folder = {
          key: x.split(" ")[1],
          parentFolder: currentLocation,
          childrenFolders: [],
          childrenFiles: []
        };
        allFolders.push(newFolder);
        currentLocation.childrenFolders.push(newFolder);
        lastFolderCreated = newFolder;
      }

      if (x.includes('$ cd ..')) {
        if (!!currentLocation.parentFolder) {
          currentLocation = currentLocation.parentFolder;
        } else {
          debugger;
        }
      }

      if (x[0].match("[0-9]")) {
        const fileSize = parseInt(x.split(" ")[0]);
        const fileName = x.split(" ")[1];
        const newFile: file = {
          key: fileName,
          size: fileSize,
          location: lastFolderCreated
        }
        lastFolderCreated.childrenFiles.push(newFile);
      }
    } catch (e) {
      console.log(e);
      debugger;
    }
  });

  output = folderSearch(rootLocation);

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

const folderSearch = (folder: folder): number => {
  /*
  let recursiveOutput = 0;
  let thisFolderOutput = 0;
  if (folder.childrenFolders.length > 0) {
    folder.childrenFolders.forEach(x => recursiveOutput = recursiveOutput + folderSearch(x));
  }
  if (folder.childrenFiles.length > 0) {
    folder.childrenFiles.forEach(x => thisFolderOutput = thisFolderOutput + x.size);
  }
  if (thisFolderOutput <= 100000){
    return thisFolderOutput + recursiveOutput;
  }
  else {
    return recursiveOutput;
  }
  */
  let thisFolderOutput = 0;
  let recursiveOutput = 0;
  folder.childrenFiles.forEach(x => thisFolderOutput = thisFolderOutput + x.size);
  folder.childrenFolders.forEach(x => thisFolderOutput = fileSearch(x));
  folder.childrenFolders.forEach(x => recursiveOutput = recursiveOutput + folderSearch(x));
  if(thisFolderOutput <= 100000){
    return thisFolderOutput + recursiveOutput;
  } else {
    return recursiveOutput;
  }

}

const fileSearch = (folder: folder): number => {
  let output = 0;
  folder.childrenFiles.forEach(x => output = output + x.size);
  folder.childrenFolders.forEach(x => output = output + fileSearch(x));
  return output;
}