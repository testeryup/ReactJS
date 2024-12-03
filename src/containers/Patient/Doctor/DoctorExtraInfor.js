import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getExtraDoctorInforById } from '../../../services/userService'
import Select from 'react-select';
import { isTemplateExpression } from 'typescript';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
            // console.log("check extra doctor infor:", res);
            if (res?.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = () => {
        console.log("show / hide");
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        console.log("check state:", this.state);
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.extra-infor-doctor.text-address'></FormattedMessage></div>
                    <div className='name-clinic'>{extraInfor?.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor?.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <div>
                                <FormattedMessage id='patient.extra-infor-doctor.price'></FormattedMessage>

                                {extraInfor?.priceTypeData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='VNĐ'
                                        className='currency'
                                    ></NumberFormat>
                                }
                                {extraInfor?.priceTypeData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='$'
                                        className='currency'
                                    ></NumberFormat>
                                }
                            </div>
                            <span
                                onClick={() => this.showHideDetailInfor()}
                                className='detail'
                            >
                                <FormattedMessage id='patient.extra-infor-doctor.detail'></FormattedMessage>
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            {/* <div className='title-price'>
                                <FormattedMessage id='patient.extra-infor-doctor.price'></FormattedMessage>
                            </div> */}
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id='patient.extra-infor-doctor.price'></FormattedMessage>
                                    </span>
                                    <span className='right'>
                                        {extraInfor?.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='VNĐ'
                                                className='currency'
                                            ></NumberFormat>
                                        }
                                        {extraInfor?.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='$'
                                                className='currency'
                                            ></NumberFormat>
                                        }
                                    </span>
                                </div>

                                <div className='note'>
                                    {extraInfor?.note}
                                </div>
                            </div>
                            <div className='payment'>
                                {
                                    extraInfor?.paymentTypeData && language === LANGUAGES.VI &&
                                    <div>
                                        <FormattedMessage id='patient.extra-infor-doctor.payment'></FormattedMessage> {extraInfor.paymentTypeData.valueVi}
                                    </div>
                                }
                                {
                                    extraInfor?.paymentTypeData && language === LANGUAGES.EN &&
                                    <div>
                                        <FormattedMessage id='patient.extra-infor-doctor.payment'></FormattedMessage> {extraInfor.paymentTypeData.valueEn}
                                    </div>
                                }
                            </div>
                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor()}><FormattedMessage id='patient.extra-infor-doctor.hide-price'></FormattedMessage></span></div>
                        </>
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
