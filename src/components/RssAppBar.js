import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddChannel from '../containers/AddChannel'
import RefreshItemList from '../containers/RefreshItemList'

class Actions extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Add channel" onClick={this.props.addChannelHandler}/>
                <RefreshItemList />
            </IconMenu>
        )
    }
}

class RssAppBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            addChannelOpened: false
        };
        this.handleOpenAddChannel = this.handleOpenAddChannel.bind(this)
    }

    handleClose = () => {
        this.setState({addChannelOpened: false});
    };

    handleOpen = () => {
        this.setState({addChannelOpened: true});
    };

    handleOpenAddChannel() {
        this.setState({addChannelOpened: true});
    }

    render() {
        return (
            <div>
                <AppBar
                    id="AppBar"
                    title="RSS Reader"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementRight={
                    <Actions addChannelHandler={this.handleOpenAddChannel} />}
                />
                <AddChannel handleClose={this.handleClose} handleOpen={this.handleOpen} open={this.state.addChannelOpened} />
            </div>
        );
    }
}

export default RssAppBar;
