import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
            console.log("check res", res)
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        console.log("check state", this.state);
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div>
                <div className='title'>
                    user redux hoi dan it chất vãi cả l, learn React Redux
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"></FormattedMessage></div>
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
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role"></FormattedMessage></label>
                                <select id="inputState" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image"></FormattedMessage></label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12 my-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"></FormattedMessage></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
