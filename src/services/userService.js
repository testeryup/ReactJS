import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data);
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkCreateScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraDoctorInforById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBooking = (data) => {
    return axios.post(`/api/patient-booking`, data);
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data);
}
const postCreateNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}
const getSpecialty = () => {
    return axios.get(`/api/get-specialty-infor`);
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
}

const getAllClinic = () => {
    return axios.get('/api/get-clinic');
}
const getDetailByClinicId = (clinicId) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${clinicId}`);
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data);
}
export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService,
    getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkCreateScheduleDoctor, getScheduleDoctorByDate,
    getExtraDoctorInforById, getProfileDoctorById, postPatientBooking, postVerifyBookAppointment,
    postCreateNewSpecialty, getSpecialty, getDetailSpecialtyById, createNewClinic, getAllClinic, 
    getDetailByClinicId, getAllPatientForDoctor, postSendRemedy
}
