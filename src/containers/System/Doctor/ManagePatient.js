import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss"
import DatePicker from '../../../components/Input/DatePicker'

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }
    async componentDidMount() {

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {

        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        ></DatePicker>
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: `100%` }}>
                            <tr>
                                <th>Name</th>
                                <th colSpan={"2"}>Telephone</th>
                            </tr>
                            <tr>
                                <td>Bill Gate</td>
                                <td>0379868891</td>
                            </tr>
                        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
