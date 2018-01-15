import React from 'react';
import PropTypes from 'prop-types'
import Item from './Item'
import './ItemList.css';

class ItemList extends React.Component {
    render() {
        return (
            <div id="ItemList">
                {this.props.items.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </div>
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default ItemList;
