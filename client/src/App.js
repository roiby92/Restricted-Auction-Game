import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './containers/Join/Join'
import GameBord from './containers/GameBord/GameBord'

function App() {
  return (

    <Router>
      <Route path='/'
        exact component={Join}
      />
      <Route path='/bord'
        exact component={GameBord}
      />
    </Router>
  );
}

export default App;
