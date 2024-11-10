import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader";
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OustandingDoctor from './Section/OustandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

import './HomePage.scss';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    handleAfterChange = (index, dontAnimate) => {
        console.log('check afterchange:', index, '\n', dontAnimate);
    }
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange
        };
        return (
            <div>
                <HomeHeader>

                </HomeHeader>
                <Specialty
                    settings={settings}
                ></Specialty>
                <MedicalFacility
                    settings={settings}
                ></MedicalFacility>
                <OustandingDoctor
                    settings={settings}
                >
                </OustandingDoctor>
                <HandBook
                    settings={settings}
                ></HandBook>
                <About></About>
                <HomeFooter></HomeFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
