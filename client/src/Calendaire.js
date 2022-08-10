import React, { useState } from 'react';
import Calendar from 'react-calendar';

function Calendaire( ) {
  const [value, onChange] = useState(new Date());
  const [list, setList] = useState([])

  function addToList(newValue){
    setList([...list, newValue])
  }

  return (
    <div>
      Hey
      <Calendar onChange={onChange} value={value} onClickDay={addToList}/>
      <div>
      <table>
        <tr>
          <th>Date</th>
          <th>Assigned Reading</th>
        </tr>

          {list.map(item => {
            return (
          <tr>
            <td>{item.toString().slice(0, 15)}</td>
            <td><input></input></td>
            <button>submit</button>
          </tr>
            )
          })}
      </table>
    </div>
    </div>
  );
}

export default Calendaire