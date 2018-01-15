import React from 'react'
import Menu from '../components/Menu'
import AsyncItemList from '../containers/AsyncItemList'
import './App.css';
import RssAppBar from './RssAppBar'

const App = () => (
    <div>
        <RssAppBar/>
        <Menu/>
        <AsyncItemList />
    </div>
);

export default App
