import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAccounts,
    fetchServices,
    fetchCombos,
    createEmployee,
    clearManagementError
} from '../stores/slices/managementSlice';
import { message } from 'antd';

const useManagementService = () => {
    const dispatch = useDispatch();
    const managementState = useSelector((state) => state.management);

    const getAccounts = async () => {
        try {
            dispatch(clearManagementError());
            const resultAction = await dispatch(fetchAccounts());

            if (fetchAccounts.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                const errorMsg = resultAction.payload?.message || 'Failed to fetch customers';
                throw new Error(errorMsg);
            }
        } catch (error) {
            message.error(error.message);
            throw error;
        }
    };

    const getServices = async () => {
        try {
            dispatch(clearManagementError());
            const resultAction = await dispatch(fetchServices());

            if (fetchServices.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                const errorMsg = resultAction.payload?.message || 'Failed to fetch services';
                throw new Error(errorMsg);
            }
        } catch (error) {
            // message.error(error.message);
            throw error;
        }
    };

    const getCombos = async () => {
        try {
            dispatch(clearManagementError());
            const resultAction = await dispatch(fetchCombos());

            if (fetchCombos.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                const errorMsg = resultAction.payload?.message || 'Failed to fetch combos';
                throw new Error(errorMsg);
            }
        } catch (error) {
            // message.error(error.message);
            throw error;
        }
    };

    const createNewEmployee = async (employeeData) => {
        try {
            dispatch(clearManagementError());
            const resultAction = await dispatch(createEmployee(employeeData));

            if (createEmployee.fulfilled.match(resultAction)) {
                message.success('Tạo nhân viên thành công');
                return resultAction.payload;
            } else {
                const errorMsg = resultAction.payload?.message || 'Tạo nhân viên thất bại';
                throw new Error(errorMsg);
            }
        } catch (error) {
            // message.error(error.message);
            throw error;
        }
    };


    return {
        getAccounts,
        getServices,
        getCombos,
        createNewEmployee,
        managementState,
    };
};

export default useManagementService;