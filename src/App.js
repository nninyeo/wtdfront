

import './styles/normalize.css';
import './styles/App.css';
import './styles/wantedCopy.css';
import './styles/yearModal.css';
import './styles/test.css';
import './styles/regionModal.css';
import './styles/card.css';

import KakaoMap from './pages/KakaoMap.js'
import Navi from './pages/Navi.js';
import JobList from './pages/JobList.js';
import Header from './pages/Header.js';
import TestFooter from './pages/TestFooter.js';
// import SectionYearBar from './pages/SectionYearBar.js';

//const cors = require('cors');

function App() {


  // const tester = () => {
  //   console.log("tester!");
  // }
  let tester = "TESTER"

  return (
    <div className="App">
    
      <Header></Header>      
      <Navi></Navi>
      <KakaoMap
        tester = {tester}
      ></KakaoMap>
      <JobList></JobList>
      <TestFooter></TestFooter>

    </div>
  );
}

export default App;
