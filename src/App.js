import { useEffect, useState } from 'react';
import readXlsxFile from 'read-excel-file';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [fileData, setFileData] = useState(null);

  const importExcelData = e => {
    const readFile = async () => {
      const data = await readXlsxFile(e.target.files[0]);
      console.log('___rows', data);

      setFileData(data);
    };

    readFile();
  };

  useEffect(() => {
    if (fileData) {
      const keys = fileData[0];
      const values = fileData.slice(1);

      console.log('values', values);

      const newGroups = values.map(item =>
        item.reduce((acc, curr, idx) => {
          return {
            ...acc,
            [keys[idx]]: curr,
          };
        }, {})
      );

      console.log('teste', newGroups);

      setGroups([...newGroups]);
    }
  }, [fileData]);

  return (
    <div className="App" style={{ padding: '1em' }}>
      <br />
      <br />
      <input type="file" onChange={importExcelData} />

      <br />
      <br />
      <br />
      <br />

      {groups?.map((group, idx) => (
        <div key={idx}>
          <strong>Group: {idx + 1}</strong>

          <ul>
            {Object.entries(group).map(([key, value]) => (
              <li key={`${key}-${value}`}>
                <strong>{key}</strong> : {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
