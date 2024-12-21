import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let result = await getAllClinic();
        if (result && result.errCode === 0) {
            this.setState({
                dataClinic: result.data ? result.data : []
            })
        }
    }

    handleViewClinic = (clinic) => {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }
    render() {
        let { dataClinic } = this.state;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic?.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child' key={item.id} onClick={() => this.handleViewClinic(item)}>
                                            <div
                                                className='bg-image section-medical-facility'
                                                style={{ background: `#eee url(${item.image ? item.image : ''}) no-repeat center center / cover` }}
                                            ></div>
                                            <div className='clinic-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
