import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: false,
            errCode: -1
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            if (token && doctorId) {
                console.log("check token:", token, doctorId);
                let res = await postVerifyBookAppointment({ token, doctorId });
                if (res?.errCode === 0) {
                    this.setState({
                        confirmed: true,
                        errCode: 0
                    })
                }
                if (res?.errCode === 1) {
                    this.setState({
                        confirmed: false,
                        errCode: 1
                    })
                }
                if (res?.errCode === 2) {
                    this.setState({
                        confirmed: true,
                        errCode: 2
                    })
                }
            }
        }

    }



    render() {
        let { confirmed, errCode } = this.state;
        console.log("check state:", this.state);
        return (
            <div>
                <head><meta name="robots" content="noarchive,noimageindex,nofollow,nosnippet"/></head>
                <HomeHeader></HomeHeader>

                <div className='verify-email-container'>
                    {
                        confirmed === false ?
                            <div>Loading data</div> :
                            (errCode === 0 ?
                                <div className='infor-booking'>Cảm ơn bạn đã đặt lịch ở BỐ MÀY CARE!</div>
                                :
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>)

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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
