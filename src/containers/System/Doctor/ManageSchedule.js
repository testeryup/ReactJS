import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedDate, FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils/constant';
import { getDetailInforDoctor } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker'
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash'
import {saveBulkCreateScheduleDoctor} from '../../../services/userService'
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            console.log("check range time:", this.props.allScheduleTime);
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let results = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                results.push(object)
            })
        }
        return results;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let rangeTime = [...this.state.rangeTime];
        if(rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
        }
        this.setState({
            rangeTime: rangeTime
        })
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];

        if(!currentDate){
            toast.error('Invalid date!');
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Please choose your doctor!');
            return;
        }
        // let formatedDate = moment(currentDate).unix();
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(time => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = new Date(currentDate).getTime();
                    object.timeType = time.keyMap;
                    result.push(object);
                })
            }
            else{
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveBulkCreateScheduleDoctor({
            arrSchedule: result,
            formattedDate: new Date(currentDate).getTime(),
            doctorId: selectedDoctor.value
        });
        console.log("check result:", result);
    }
    render() {
        // const { isLoggedIn } = this.props;
        // console.log("check state", this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        // console.log("check state rangeTime:", rangeTime);
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                // className="form-control"
                                ></Select>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date"></FormattedMessage></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                ></DatePicker>
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {
                                    rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (<button
                                            className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>)
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button 
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                                ><FormattedMessage id="manage-schedule.save"></FormattedMessage></button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
