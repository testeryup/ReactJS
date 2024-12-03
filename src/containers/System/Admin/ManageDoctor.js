import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant'
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            hasOldData: false,
            listDoctors: [],

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            console.log("CHECK ALL: ", dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            id: this.state.selectedOption.value,
            description: this.state.description,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption
        });
        let {listPayment, listPrice, listProvince} = this.state;
        

        let response = await getDetailInforDoctor(selectedOption.value);
        if (response?.errCode === 0 && response.data?.Markdown) {
            let markdown = response.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
            paymentId = '', priceId = '', provinceId = '',
            selectedPayment = '', selectedPrice = '', selectedProvince = '';

            
            if(response.data.Doctor_Infor){
                addressClinic = response.data.Doctor_Infor.addressClinic;
                nameClinic = response.data.Doctor_Infor.nameClinic;
                note = response.data.Doctor_Infor.note;

                paymentId = response.data.Doctor_Infor.paymentId;
                priceId = response.data.Doctor_Infor.priceId;
                provinceId = response.data.Doctor_Infor.provinceId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
                nameClinic: nameClinic,
                note: note,
                addressClinic: addressClinic,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                note: '',
                addressClinic: ''
            })
        }
        console.log('check change select:', response);
    }
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    buildDataInputSelect = (inputData, type) => {
        let results = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id
                    results.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VNĐ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    results.push(object);
                })
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    results.push(object);
                })
            }

        }
        return results;
    }
    render() {
        let { hasOldData } = this.state;
        let arrDoctors = this.state.listDoctors;
        console.log("CHECK ALL STATE:", this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title"></FormattedMessage></div>
                <div className='more-infor'>
                    <div className='content-left form-group'>

                        <label><FormattedMessage id="admin.manage-doctor.selection"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.selection"></FormattedMessage>}
                            name={'check var'}
                        ></Select>
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"></FormattedMessage></label>
                        <textarea
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"></FormattedMessage>}
                            name={'selectedPrice'}

                        ></Select>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"></FormattedMessage>}
                            name={'selectedPayment'}
                        ></Select>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province"></FormattedMessage></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"></FormattedMessage>}
                            name={'selectedProvince'}
                        ></Select>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"></FormattedMessage></label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                        value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.address"></FormattedMessage></label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                        value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"></FormattedMessage></label>
                        <input className='form-control'
                        onChange={(event) => this.handleOnChangeText(event, 'note')}
                        value={this.state.note}

                        ></input>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >{hasOldData === true ? <FormattedMessage id="admin.manage-doctor.save"></FormattedMessage> : <FormattedMessage id="admin.manage-doctor.add"></FormattedMessage>}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
