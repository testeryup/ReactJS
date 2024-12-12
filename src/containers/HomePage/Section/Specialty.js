import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getSpecialty } from '../../../services/userService'
import { withRouter } from 'react-router-dom';

import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpg'



class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getSpecialty();
        if (res?.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    changeLanguage = (language) => {
        // console.log(this.props);
        this.props.changeLanguageAppRedux(language);
    }
    handleViewSpecialty = (specialtyId) => {
        this.props.history.push(`/detail-specialty/${specialtyId}`)
    }
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={"homepage.popular-specialty"}></FormattedMessage></span>
                        <button className='btn-section'><FormattedMessage id={"homepage.more"}></FormattedMessage></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                dataSpecialty?.length > 0 && dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={item.id}>
                                            <div
                                                className='bg-image section-specialty'
                                                style={{ background: `#eee url(${item.image}) no-repeat center center / cover` }}
                                            ></div>
                                            <div 
                                            className='specialty-name'
                                            onClick={() => this.handleViewSpecialty(item.id)}
                                            >{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
