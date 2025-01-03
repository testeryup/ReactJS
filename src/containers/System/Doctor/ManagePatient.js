import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss"
import DatePicker from '../../../components/Input/DatePicker'
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { isOptionalChain } from 'typescript';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        });
        if (res?.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }
    handleButtonConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal,
            dataModal: data
        })
        console.log("check data:", data)
    }
    handleButtonRemedy = () => {
        alert("remedy");

    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChildModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            ...dataChildModal,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.firstName
        })

        this.setState({
            isShowLoading: false
        })
        if (res?.errCode === 0) {
            toast.success("send remedy succeed!");
            this.closeRemedyModal();
            await this.getDataPatient();
        }
        else {
            toast.error("send remedy failed!")
        }
    }
    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            ></DatePicker>
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: `100%` }}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPatient?.length > 0 ?
                                            dataPatient.map(
                                                (item, index) => {
                                                    let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button className='mp-btn-confirm'
                                                                    onClick={() => this.handleButtonConfirm(item)}
                                                                >Xác nhận</button>
                                                                <button className='mp-btn-remedy'
                                                                    onClick={() => this.handleButtonRemedy()}
                                                                >Gửi hoá đơn</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>No data available</td>
                                                </tr>
                                            )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
                <RemedyModal
                    isOpenModal={this.state.isOpenRemedyModal}
                    dataModal={this.state.dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                ></RemedyModal>

                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading your content...'
                >
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
