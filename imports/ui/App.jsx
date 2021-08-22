import React from 'react';
import { Task } from './Task';

 
const tasks = [
  {_id: 1, text: 'Tyler'},
  {_id: 2, text: 'Krae'},
  {_id: 3, text: 'Noa'},
];

export const App = () => (
  <div>
    <h1>Welcome to Todos!</h1>
 
    <ul>
      { tasks.map(task => <Task key={ task._id } task={ task }/>) }
    </ul>
  </div>
);
