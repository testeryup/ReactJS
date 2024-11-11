import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({ arrDoctors: this.props.topDoctors })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    render() {
        console.log("check top doctors props:", this.props.topDoctors);
        let allDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.outstanding-doctor"></FormattedMessage></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more"></FormattedMessage></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {
                                allDoctors && allDoctors.length > 0 &&
                                allDoctors.map((item, index) => {
                                    let base64Image = '';
                                    if (item.image) {
                                        base64Image = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    if (index === 0) { console.log("check item:", item) }
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    return (<div className='section-customize'>
                                        <div className='customize-border'>
                                            <div className='outer-background'>
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{ background: `#eee url(${base64Image}) no-repeat center center / cover` }}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Tiêu hoá</div>
                                            </div>
                                        </div>
                                    </div>)
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
