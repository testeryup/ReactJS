import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {

        }
    }
    render() {
        console.log("check profile state:", this.state);
        let { dataProfile } = this.state;
        let nameEn = '', nameVi = '';
        let { language } = this.props;
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    ></div>
                    <div className='content-right'>
                        <div className='up'>
                            {
                                language === LANGUAGES.VI ? nameVi : nameEn
                            }
                        </div>
                        <div className='down'>
                            {
                                dataProfile
                                && dataProfile.Markdown
                                && dataProfile.Markdown.description
                                && <span>{dataProfile.Markdown.description}</span>
                            }
                        </div>
                    </div>

                </div>
                <div className='price'>
                    {/* {
                        dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                            dataProfile.Doctor_Infor.priceTypeData.valueVi : ''
                    }
                    {
                        dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?
                            dataProfile.Doctor_Infor.priceTypeData.valueEn : ''
                    } */}
                    Giá khám: 
                    {dataProfile?.Doctor_Infor && language === LANGUAGES.VI &&
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='VNĐ'
                            className='currency'
                        ></NumberFormat>
                    }
                    {dataProfile?.Doctor_Infor && language === LANGUAGES.EN &&
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='$'
                            className='currency'
                        ></NumberFormat>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
