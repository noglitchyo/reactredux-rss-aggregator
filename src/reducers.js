import { combineReducers } from 'redux'
import {
    ADD_CHANNEL,
    SELECT_CHANNEL,
    INVALIDATE_CHANNEL,
    REQUEST_CHANNEL,
    RECEIVE_CHANNEL
} from './actions'

function channelLinks(state = [
    'http://localhost:3000/rss1/rss.xml',
    'http://localhost:3000/rss2/rss.xml',
    'http://localhost:3000/rss3/rss.xml',
    'http://localhost:3000/rss4/rss.xml',
    'http://localhost:3000/rss5/rss.xml',
    'http://localhost:3000/rss6/rss.xml',
], action)
{
    switch (action.type) {
        case ADD_CHANNEL:
            return [...state, ...[action.link]];
        default:
            return state;
    }
}

/**
 * Contains all the channels data: channel info and items
 * @param state
 * @param action
 * @returns {*}
 */
function channel(
    state = {
        isFetching: false,
        didInvalidate: false,
        data: {}
    },
    action
) {
    switch (action.type) {
        case SELECT_CHANNEL:
            return Object.assign({}, state, {
                active: false
            });
        case INVALIDATE_CHANNEL:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_CHANNEL:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                data: action.channel,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function channels(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_CHANNEL:
        case RECEIVE_CHANNEL:
        case REQUEST_CHANNEL:
            return Object.assign({}, state, {
                [action.link]: channel(state[action.link], action)
            });
        default:
            return state
    }
}

function selectedChannelLink(state = 'http://localhost:3000/rss1/rss.xml', action) {
    switch (action.type) {
        case SELECT_CHANNEL:
            return action.link === state ? false : action.link;
        default:
            return state;
    }
}

const rssAggregatorApp = combineReducers({
    channelLinks,
    channels,
    selectedChannelLink,
    channel
});

export default rssAggregatorApp
