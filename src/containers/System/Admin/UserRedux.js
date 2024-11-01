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
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.getGenderStart()); need import library
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            role: this.state.role,
            position: this.state.position,
        })
        console.log('check state before submit', this.state);
    }

    onChangeInput = (event, id) => {
        // email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     phonenumber: '',
        //     address: '',
        //     gender: '',
        //     position: '',
        //     role: '',
        //     avatar: ''
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

    }

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrCheck.length; ++i) {
            if (!this.state[arrCheck[i]]) {
                alert('Required input is missing:' + arrCheck[i]);
                return false;
            }
        }
        return true;
    }

    render() {
        let {
            email, password, firstName, lastName, phonenumber, address, gender, position, role, avatar
        } = this.state;

        // console.log("check state", this.state);
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
                                <input className='form-control' type="email"
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"></FormattedMessage></label>
                                <input className='form-control' type="password"
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name"></FormattedMessage></label>
                                <input className='form-control' type="text"
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name"></FormattedMessage></label>
                                <input className='form-control' type="text"
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber"></FormattedMessage></label>
                                <input className='form-control' type="text"
                                    value={phonenumber}
                                    onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"></FormattedMessage></label>
                                <input className='form-control' type="text"
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender"></FormattedMessage></label>
                                <select className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position"></FormattedMessage></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'position')}

                                >
                                    {
                                        positions && positions.length > 0
                                        && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"></FormattedMessage></label>
                                <select id="inputState" class="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {
                                        roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
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
                                <button className='btn btn-primary'
                                    onClick={this.handleSaveUser}
                                ><FormattedMessage id="manage-user.save"></FormattedMessage></button>
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
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
