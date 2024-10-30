import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';

import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.getGenderStart()); need import library
    }

    componentDidUpdate(prevProv, prevState, snapshot) {
        if (prevProv.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProv.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProv.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgUrl){
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    render() {
        console.log("check state", this.state);
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        // const { genderArr, positionArr, roleArr } = this.state;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div>
                <div className='title'>
                    user redux hoi dan it chất vãi cả l, learn React Redux
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"></FormattedMessage></div>
                            <div className='col-12 text-center'>{isLoadingGender === true ? 'Loading' : ''}</div>

                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type="email" />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"></FormattedMessage></label>
                                <input className='form-control' type="password" />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"></FormattedMessage></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"></FormattedMessage></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber"></FormattedMessage></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"></FormattedMessage></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"></FormattedMessage></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"></FormattedMessage></label>
                                <select id="inputState" className="form-control">
                                    {
                                        positions && positions.length > 0
                                        && positions.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"></FormattedMessage></label>
                                <select id="inputState" class="form-control">
                                    {
                                        roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image"></FormattedMessage></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={this.openPreviewImage}
                                    ></div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"></FormattedMessage></button>
                            </div>
                        </div>

                    </div>
                </div>
                {
                this.state.isOpen && (<Lightbox
                    mainSrc={this.state.previewImgUrl}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />)
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
