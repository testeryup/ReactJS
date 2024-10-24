import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader";
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OustandingDoctor from './Section/OustandingDoctor';
import HandBook from './Section/HandBook';
import './HomePage.scss';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
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
