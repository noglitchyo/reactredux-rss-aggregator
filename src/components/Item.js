import React from 'react';
import PropTypes from 'prop-types'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import striptags from 'striptags';

class Item extends React.Component {
    render() {
        return (
            <Card>
                <CardTitle
                    showExpandableButton={true}
                    actAsExpander={true} title={this.props.title}
                    subtitle={this.props.pubDate}
                />
                <CardText expandable={true}>{striptags(this.props.description)}</CardText>
                <CardActions>
                    <FlatButton target="__blank" primary={true} href={this.props.link} label="Open" />
                </CardActions>
            </Card>
        );
    }
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    channel: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Item;
