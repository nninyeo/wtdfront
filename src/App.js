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

function App() {
  return (
    <div className="App">
    
      <Header></Header>      
      <Navi></Navi>
      <KakaoMap></KakaoMap>
      <JobList></JobList>
      <TestFooter></TestFooter>

    </div>
  );
}

export default App;
