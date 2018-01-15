import axios from 'axios';
import xml2js from 'xml2js';

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const FILTER_CHANNEL = 'FILTER_CHANNEL';
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const INVALIDATE_CHANNEL = 'INVALIDATE_CHANNEL';

export function addChannel(link) {
    return {
        type: ADD_CHANNEL,
        link: link
    }
}

export function selectChannel(channelLink) {
    return {
        type: SELECT_CHANNEL,
        link: channelLink
    }
}

export function filterChannel(link) {
    return {
        type: FILTER_CHANNEL,
        link: link
    }
}

export function invalidateChannel(channelLink) {
    return {
        type: INVALIDATE_CHANNEL,
        link: channelLink
    }
}

function requestChannel(channelLink) {
    return {
        type: REQUEST_CHANNEL,
        link: channelLink
    }
}

function receiveChannel(channelLink, json) {
    return {
        type: RECEIVE_CHANNEL,
        link: channelLink,
        channel: json.rss.channel, //.item.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchChannel(channelLink) {
    return dispatch => {
        dispatch(requestChannel(channelLink))
        return axios.get(channelLink)
            .then(response => response.data)
            .then(data => parseXmlData(data))
            .then(json => dispatch(receiveChannel(channelLink, json)))
    }
}

function parseXmlData(data) {
    let Parser =  xml2js.Parser({
        explicitArray: false
    });
    let parsed = '';
    Parser.parseString(data, function (err, result) {
        parsed = result;
    });
    return parsed;
}

function shouldFetchChannel(state, channelLink) {
   const channel = state.channels[channelLink]
   if (!channel) {
       return true
   } else if (channel.isFetching) {
       return false
   } else {
       return channel.didInvalidate
   }
}

export function fetchChannelIfNeeded(channelLink) {
    return (dispatch, getState) => {
        if (shouldFetchChannel(getState(), channelLink)) {
            return dispatch(fetchChannel(channelLink))
        }
    }
}
