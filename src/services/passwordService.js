// src/services/passwordService.js
import { useDispatch } from 'react-redux';
import {
    requestChangePassword as requestChangePasswordAction,
    changePassword as changePasswordAction,
    clearPasswordState
} from '../stores/slices/passwordSlice';

const usePasswordService = () => {
    const dispatch = useDispatch();

    const requestChangePassword = async (email) => {
        try {
            dispatch(clearPasswordState());
            const resultAction = await dispatch(requestChangePasswordAction(email));
            if (requestChangePasswordAction.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else if (requestChangePasswordAction.rejected.match(resultAction)) {
                throw resultAction.payload; // Ném lỗi từ server
            }
        } catch (error) {
            throw error; // Truyền lỗi lên component
        }
    };

    const changePassword = async (data) => {
        try {
            dispatch(clearPasswordState());
            await dispatch(changePasswordAction(data));
        } catch (error) {
            throw new error;
        }
    };

    return {
        requestChangePassword,
        changePassword
    };
};

export default usePasswordService;
