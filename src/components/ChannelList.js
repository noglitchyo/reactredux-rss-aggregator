import React from 'react';
import PropTypes from 'prop-types'
import AsyncChannel from '../containers/AsyncChannel'
import './Channel.css'

class ChannelList extends React.Component {
    isActive(channelLink) {
        return this.props.selectedChannelLink === channelLink;
    }

    render() {
        return (
            <div>
                {this.props.channels.map((channelLink, index) => (
                    <AsyncChannel
                        className="channel"
                        key={index}
                        active={this.isActive(channelLink)}
                        link={channelLink} />
                ))}
            </div>
        );
    }
}

ChannelList.propTypes = {
    channels: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            description: PropTypes.optionalString
        }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired
};

export default ChannelList;
