import React from 'react';
import { connect } from 'react-redux'
import { addChannel } from '../actions'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AddChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let value = this.state.value;
        if (!value.trim()) {
            return;
        }
        this.props.dispatch(addChannel(value));
        this.setState({
            value: '',
        });
        this.props.handleClose();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Add a new channel by entering its link"
                    modal={false}
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}>
                    <TextField
                        id="addChannelTextField"
                        onChange={this.handleChange}
                        value={this.state.value}
                        hintText="Enter your channel URL..."
                    />
                </Dialog>
            </div>
        )
    }
}

AddChannel = connect()(AddChannel);

export default AddChannel;
