import React from 'react'
import ChannelListFilters from '../containers/ChannelListFilters'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton';
import './Menu.css'

const Menu = () => (
    <Drawer id="filters">
        <ChannelListFilters />
    </Drawer>
);
export default Menu
