import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
// import { Modal } from 'reactstrap';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy ,dataTime} = this.props;
        let doctorId = "";
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId;
        }
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    // toggle={() => this.toggle()}
                    className='booking-modal-container'
                    size='lg'
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hoá đơn khám bệnh thành công</h5>
                        <button onClick={closeRemedyModal} type="button" className="btn-close" aria-label="Close">
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <div>
                                    <label>Email bệnh nhân</label>
                                    <input className='form-control' type='email' 
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeEmail(event)}
                                    ></input>
                                </div>
                            </div>
                            <div className='col-6 form-group'>
                                <div>
                                    <label>Chọn File đơn thuốc</label>
                                    <input className='form-control-file' type='file'
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSendRemedy}>
                            Do Something
                        </Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
