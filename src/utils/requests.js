import axiosInstance from "./axiosInstance"

export const login = async (data) => {
    return await axiosInstance.post('/login', data);
}

export const getUserInfo = async () => {
    return await axiosInstance.get('/get-user');
}

export const registration = async (data) => {
    return await axiosInstance.post('/create-account', data);
}

export const getAllNotes = async () => (
    await axiosInstance.get('/get-all-notes')
)

export const addNewNote = async (data) => {
    return await axiosInstance.post('/add-note', data);
}

export const editNote = async (data) => {
    return await axiosInstance.put(`edit-note/${data.id}`, data);
}

export const deleteNote = async (id) => {
    return await axiosInstance.delete(`/delete-note/${id}`);
}