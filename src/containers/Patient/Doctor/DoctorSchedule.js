import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
import Select from 'react-select';
import { isTemplateExpression } from 'typescript';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props;

        let allDays = this.getArrDay(language);
        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            if(res?.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
        this.setState({
            allDays: allDays,
        })
    }
    capitalizeTheFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    getArrDay = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; ++i) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeTheFirstLetter(labelVi);
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDay(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDay(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);

            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvailableTime,dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}
                        >
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fa fa-calendar"></i> <span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage></span>
                        </div>
                        <div className='time-content'>
                            {
                                allAvailableTime && allAvailableTime.length > 0 ?
                                    <React.Fragment >
                                        <div className='time-content-btn-list'>
                                            {
                                                allAvailableTime.map((item, index) => {
                                                    let timeDisplay = language === LANGUAGES.VI ?
                                                        item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                    return <button
                                                        key={index}
                                                        className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                })
                                            }
                                        </div>
                                        <div className='booking-suggest'>
                                            <span> <i className='far fa-hand-point-up'></i> </span><FormattedMessage id="patient.detail-doctor.booking-suggest"></FormattedMessage>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage></div>
                            }
                        </div>
                    </div>
                </div >
                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    closeBooking={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                ></BookingModal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
