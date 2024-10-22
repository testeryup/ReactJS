import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';

import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        // console.log(this.props);
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        console.log('check this props lang:', this.props.language);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty"></FormattedMessage></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor"></FormattedMessage></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-specialty"></FormattedMessage></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room"></FormattedMessage></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor"></FormattedMessage></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-doctor"></FormattedMessage></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee"></FormattedMessage></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.check-health"></FormattedMessage></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"><FormattedMessage id="home-header.support"></FormattedMessage></i>

                            </div>
                            <div className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>US</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-above'>
                        <div className='title1'><FormattedMessage id="banner.title1"></FormattedMessage></div>
                        <div className='title2'><FormattedMessage id="banner.title2"></FormattedMessage></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh'></input>
                        </div>
                    </div>
                    <div className='content-below'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child1"></FormattedMessage></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child2"></FormattedMessage></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child3"></FormattedMessage></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child4"></FormattedMessage></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-brands fa-discourse"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child5"></FormattedMessage></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-teeth"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child6"></FormattedMessage></div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
