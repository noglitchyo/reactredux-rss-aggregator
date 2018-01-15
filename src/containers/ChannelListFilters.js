import { connect } from 'react-redux'
import { filterChannel } from '../actions'
import ChannelList from '../components/ChannelList'

const mapDispatchToProps = dispatch => {
    return {
        onClick: link  => {
            dispatch(filterChannel(link))
        }
    }
};
const mapStateToProps = (state) => {
    return {
        channels: state.channelLinks,
        selectedChannelLink: state.selectedChannelLink
    };
};

const ChannelListFilters = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelList);

export default ChannelListFilters
