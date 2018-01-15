import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    selectChannel,
    fetchChannelIfNeeded,
    invalidateChannel
} from '../actions'
import ChannelList from "../components/ChannelList";
import Channel from "../components/Channel";
import RefreshIndicator from 'material-ui/RefreshIndicator';

class AsyncChannel extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch, link } = this.props
        dispatch(fetchChannelIfNeeded(link))
    }

    handleChange(channelLink) {
        this.props.dispatch(selectChannel(channelLink))
        this.props.dispatch(fetchChannelIfNeeded(channelLink))
    }

    render() {
        return (
            <Channel {...this.props.data}
                isFetching={this.props.isFetching}
                active={this.props.active}
                onClick={ () => {this.handleChange(this.props.link)}}
            />
        )
    }
}

AsyncChannel.propTypes = {
    data: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { channels } = state;
    const {
        isFetching,
        lastUpdated,
        data,
        } = channels[ownProps.link] || {
        isFetching: true,
        data: {}
    };

    return {
        data,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncChannel)
