import React  from 'react';
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem';
import {fetchChannelIfNeeded, invalidateChannel, selectChannel} from "../actions";

let RefreshItemList = ({ dispatch, selectedChannelLink, channels }) => {
    return (
        <MenuItem primaryText="Refresh"
                  onClick={e => {
                e.preventDefault();
                let toRefresh = [];

                if (selectedChannelLink) {
                    toRefresh.push(selectedChannelLink);
                } else {
                    toRefresh = channels;
                }
                console.log(toRefresh);
                toRefresh.forEach(function (channelLink) {
                    dispatch(invalidateChannel(channelLink));
                    dispatch(fetchChannelIfNeeded(channelLink));
                });
            }}
            className="actionButton" />
    )
};

const mapStateToProps = (state) => {
    return {
        channels: state.channelLinks,
        selectedChannelLink: state.selectedChannelLink
    };
};


RefreshItemList = connect(mapStateToProps)(RefreshItemList);

export default RefreshItemList;
