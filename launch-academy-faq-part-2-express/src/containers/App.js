import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FAQContainer from '../components/FAQContainer'
import LauncherList from '../components/LauncherList'
import LauncherShow from '../components/LauncherShow'

const App = props => {
  return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={FAQContainer}></Route>
          <Route exact path='/launchers' component={LauncherList}></Route>
          <Route exact path='/launchers/:id' component={LauncherShow}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App