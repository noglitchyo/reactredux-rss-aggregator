import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemList from "../components/ItemList"

class AsyncItemList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.isFetching && <h2>Loading...</h2>}
                {!this.props.isFetching && this.props.items &&
                    <ItemList items={this.props.items} />
                }
            </div>
        )
    }
}

AsyncItemList.propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function sortItems(items, descending = true) {
    return items.sort(function(a, b){
        let d1 = new Date(a.pubDate);
        let d2 = new Date(b.pubDate);
        if (d1 < d2) {
            return descending ? 1 : -1;
        }
        if (d1 > d2){
            return descending ? -1 : 1;
        }
        return 0;
    });
}

function prepareItemsFromChannels(channels) {
    let items = [];

    if (channels.data) {
        channels.map(function(channel){
            return [...items, ...channel.data.item]
        });
    }

    return sortItems(items);
}

function getAllChannelsItems(channels) {
    const {
        isFetching,
        lastUpdated
        } = prepareItemsFromChannels(channels) || {
        isFetching: true,
        data: {}
    };

    let items = [];
    const channelsArray = Object.values(channels);
    if (channelsArray.length) {
        items = [...items, ...channelsArray.map(function(channel){
            if (channel.data.item) {
                return [...items,...channel.data.item];
            }
        })].reduce((a, b) => a.concat(b), []);
    }
    return {
        items: sortItems(items),
        isFetching,
        lastUpdated
    }
}

function getChannelItems(channels, channel) {
    const {
        isFetching,
        lastUpdated,
        data
        } = channels[channel] || {
        isFetching: true,
        data: {}
    };
    const items = data.item !== undefined ? (!Array.isArray(data.item) ? [data.item]: data.item)  : [];
    return {
        items: sortItems(items),
        isFetching,
        lastUpdated
    }
}

function mapStateToProps(state) {
    const { channels, selectedChannelLink } = state;

    if (selectedChannelLink !== false) {
        return getChannelItems(channels, selectedChannelLink);
    } else {
        return getAllChannelsItems(channels);
    }
}

export default connect(mapStateToProps)(AsyncItemList)
