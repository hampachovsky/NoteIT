import { useAppDispatch } from 'store/hooks';
import { clearUserError } from 'store/slices/user/userSlice';

export const useClearUserError = () => {
    const dispatch = useAppDispatch();

    const handleClear = () => {
        dispatch(clearUserError());
    };

    return { handleClear };
};
