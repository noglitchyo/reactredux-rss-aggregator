import React from 'react';
import PropTypes from 'prop-types'
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import LinearProgress from 'material-ui/LinearProgress';
import SvgIcon from 'material-ui/SvgIcon';


const CheckedIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </SvgIcon>
);

class Channel extends React.Component {
    getFaviconFromChannelLink(){
        if (this.props.link === undefined)
            return;
        return this.props.link.replace(/(\/)$/, "") + "/favicon.ico";
    }

    favicon() {
        return <Avatar src={!this.props.isFetching ? this.getFaviconFromChannelLink() : null} />
    }

    render() {
        return (
            <ListItem
                leftAvatar={this.favicon()}
                rightIcon={this.props.active ? <CheckedIcon /> : null}
                onClick={() => {this.props.onClick()}}
                primaryText={!this.props.isFetching ? this.props.title : <LinearProgress mode="indeterminate" />}
                secondaryText={this.props.description}
                className="channelItem"
            />
        );
    }
}

Channel.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
};

export default Channel;
