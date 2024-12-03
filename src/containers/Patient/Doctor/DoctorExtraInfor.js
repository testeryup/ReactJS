import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
import Select from 'react-select';
import { isTemplateExpression } from 'typescript';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = () => {
        console.log("show / hide");
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }
    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa Phố Huế</div>
                    <div className='detail-address'>207 phố Huế</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <div>
                                GIÁ KHÁM: 250.000đ
                            </div>
                            <span onClick={() => this.showHideDetailInfor()}>Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM: .</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000đ</span>
                                </div>

                                <div className='note'>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám là 250.000₫</div>
                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor()}>Ẩn bảng giá</span></div>
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
