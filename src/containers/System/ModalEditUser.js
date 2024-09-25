import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }


    }


    componentDidMount() {
        let { currentUser } = this.props;
        console.log('currentUser:', currentUser);
        if (currentUser && !_.isEmpty(currentUser)) {
            console.log(this.state);
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                password: 'hardcode',
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                address: currentUser.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; ++i) {
            if (!this.state[arrInput[i]]) {
                alert('Missing parameter: ' + arrInput[i]);
                return false;
            }
        }

        return true;
    }

    handleSaveUser = () => {
        let validateInput = this.checkValidateInput();
        if (validateInput) {
            this.props.editUser(this.state);
        }
    }
    render() {
        
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-user-container'
                size='lg'
            // centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            ></input>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => this.handleSaveUser()}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



