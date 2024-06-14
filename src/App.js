
import './App.css';

import CONFIG_CONSTANTS from './ServicesAndConstants/Config.js';
import RouterConfig from './RouterConfig.js';


function App() {

  if( localStorage.getItem('citys')===null){
    localStorage.setItem('citys',JSON.stringify(CONFIG_CONSTANTS.villes))
  }
  
  return (

  <RouterConfig/>
  
  );
}

export default App;
