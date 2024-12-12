import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageSpecialty.scss'
import { CommonUtils } from '../../../utils'
import { postCreateNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    async componentDidMount() {

    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    }
    handleSaveNewSpecialty = async () => {
        console.log("check submit state:", this.state);
        let res = await postCreateNewSpecialty(this.state);
        if (res?.errCode === 0) {
            toast.success("Add new specialty successfully!");
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }
        else {
            toast.error("Add new specialty failed!");
            console.log("check error of save new specialty:", res);
        }

    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, "name")}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}
                            // ref={this.state.imageBase64}
                        >
                        </input>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Save</button>
                    </div>
                </div>

            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
