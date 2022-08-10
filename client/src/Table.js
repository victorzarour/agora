import React, { useState } from 'react';


function Table( ) {

    const data = [
        { name: "03/07", age: "Chikamatsu Monzaemon, The Love Suicides at Amijima (Act 1)"},
        { name: "Megha", age: 19},
        { name: "Subham", age: 25},
        ]

  return (
    <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Assigned Reading</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Table