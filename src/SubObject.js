import React from 'react'

function SubObject({ key, values }) {
    console.log("hello")
  const objectList = Object.values(key).forEach(subkey=> {
      return (
        <tr key={subkey}>
            <th scope="row">{key}</th>
            <td>{subkey}</td>
            <td>{values[subkey]}</td>
        </tr>
      )
    });
  

  console.log(objectList);
  if (objectList)
    return (
      <>
        {objectList}
      </>
    );
}

export default SubObject;