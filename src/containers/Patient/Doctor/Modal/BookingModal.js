import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBooking } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            timeType: ''
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
                selectedGender: ''
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let doctorId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : '';
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data = data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    handleOnchangeInput = (event, id) => {
        let value = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = value;
        this.setState({
            ...copyState
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleOnChangeSelect = (selectedOption, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = selectedOption;
        this.setState({
            ...stateCopy
        });
    }

    handleConfirmBooking = async () => {
        console.log("check state handle ", this.state);
        let date = new Date(this.state.birthday).getTime();

        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBooking({
            fullName: this.state.fullName,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            doctorName: doctorName,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString
        });
        if (res && res.errCode === 0) {
            toast.success("Booking new appointment successfully!");
            this.props.closeBooking();
            this.setState({
                fullName: '',
                phonenumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                timeType: ''
            });
        }
        else {
            toast.error("Booking failed");
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`;
        }
        return ``;
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return ``;
    }
    render() {
        // fullName: '',
        //     phonenumber: '',
        //     email: '',
        //     address: '',
        //     reason: '',
        //     birthday: '',
        //     gender: '',
        //     gender: '',
        //     doctorId: ''
        let { isOpenModal, closeBooking, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        console.log("check doctorId:", doctorId);
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    // toggle={() => this.toggle()}
                    className='booking-modal-container'
                    size='lg'
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.booking-modal.title'></FormattedMessage></span>
                            <span
                                className='right'
                                onClick={closeBooking}
                            ><i className='far fa-times-circle'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                ></ProfileDoctor>
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.fullName'></FormattedMessage></label>
                                    <input
                                        className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.phoneNumber'></FormattedMessage></label>
                                    <input
                                        className='form-control'
                                        value={this.state.phonenumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.email'></FormattedMessage></label>
                                    <input
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.address'></FormattedMessage></label>
                                    <input
                                        className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    ></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.reason'></FormattedMessage></label>
                                    <input
                                        className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.birthday'></FormattedMessage></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    // minDate={new Date().setHours(0, 0, 0, 0)}
                                    ></DatePicker>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.gender'></FormattedMessage></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={(selectedOption) => this.handleOnChangeSelect(selectedOption, 'selectedGender')}
                                        options={this.state.genders}
                                        placeholder="Select gender"
                                        name="selectedGender"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            ><FormattedMessage id='patient.booking-modal.btnConfirm'></FormattedMessage></button>
                            <button
                                className='btn-booking-cancel'
                                onClick={closeBooking}
                            ><FormattedMessage id='patient.booking-modal.btnCancel'></FormattedMessage></button>
                        </div>
                    </div>
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
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
