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
      } else if (x.includes('$ cd ..')) {
        if (!!currentLocation.parentFolder) {
          currentLocation = currentLocation.parentFolder;
        }
      } else if (x.includes('$ cd')) {
        const locationKey = x.split(" ")[2];
        currentLocation = currentLocation.childrenFolders[currentLocation.childrenFolders.map(obj => obj.key).indexOf(locationKey)];
      } else if (x.includes('dir')) {
        const newFolder: folder = {
          key: x.split(" ")[1],
          parentFolder: currentLocation,
          childrenFolders: [],
          childrenFiles: []
        };
        allFolders.push(newFolder);
        currentLocation.childrenFolders.push(newFolder);
        lastFolderCreated = newFolder;
      } else if (x[0].match("[0-9]")) {
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

  const searchFolders = (folder: folder): number => {
    let folderSize = 0;
    folder.childrenFolders.forEach(x => folderSize = folderSize + searchFolders(x));
    folder.childrenFiles.forEach(x => folderSize = folderSize + x.size);
    return folderSize;
  }

  allFolders.forEach(x => {
    const temp = searchFolders(x);
    output = temp <= 100000 ? output + temp : output + 0;
  });

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