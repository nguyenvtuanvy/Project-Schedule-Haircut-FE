// src/services/aiService.js
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage, clearMessages, addMessage } from '../stores/slices/aiSlice';
import { toast } from 'react-toastify';

const useAIService = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.ai.messages);
    const isLoading = useSelector(state => state.ai.isLoading);

    const sendMessage = async (message) => {
        try {
            dispatch(addMessage({
                text: message,
                isBot: false,
                isError: false,
                id: Date.now() // ID duy nhất
            }));

            const resultAction = await dispatch(sendChatMessage(message));

            if (sendChatMessage.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                const errorMsg = resultAction.payload?.message || 'Gửi tin nhắn thất bại';
                throw new Error(errorMsg);
            }
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };


    const clearChatHistory = () => {
        dispatch(clearMessages());
    };

    return {
        sendMessage,
        clearChatHistory,
        messages,
        isLoading,
    };
};

export default useAIService;