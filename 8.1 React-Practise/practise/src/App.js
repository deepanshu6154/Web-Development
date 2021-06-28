import logo from './logo.svg';
import './App.css';
import List from './Components/List.js'
import Props from './Components/Props.js'
import State from './Components/State.js'
import Listandkeys from './Components/Listandkeys.js'
import Formhandling from './Components/Formhandling.js'
import Lifecycle from './Components/Lifecycle';

function App() {

  const numbers = [1,2,3,4,5,6];
  return (
    <div className="App">
      {/* <List></List> */}
      {/* <Props name='Deepu' company='Google' city='Rewari'></Props>
      <Props name='Salman' company='Amazon' city='Gurgaon'></Props>
      <Props name='Anil' company='American Express' city='Bangalore'></Props> */}
      {/* <State></State> */}
      {/* <Listandkeys numArr={numbers}/> */}
      {/* <Formhandling></Formhandling> */}
      <Lifecycle></Lifecycle>
    </div>
  );
}

export default App;
