import axios from '../api/axios';
import useAuth from './useAuth';

const useRefresh = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    const refresh = async () => {
        console.log("auth: " + auth.idUser);
        const response = await axios.get('/authentication/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                accessToken: response.data.accessToken,
                idUser: response.data.idUser
            }
        })
    }

    return refresh;


};

export default useRefresh;