import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Opportunity from './Opportunity';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useStoreActions, useStoreState } from 'easy-peasy'


const OpportunityList = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const from = location.state?.from?.pathname || '';
    const [isLoading, setIsLoading] = useState();
    const [opportunities, setOpportunities] = useState([{}]);
    const dateForOpportunityList = useStoreState((state) => state.dateForOpportunityList);
    const isForToday = dateForOpportunityList ? false : true;

    const fetchOppurtinities = async (e) => {
        setIsLoading(true);
        try {
            const response = await axiosPrivate.get('/opportunities',
                {
                    withCredentials: true,
                    responseType: 'json',
                    params: {
                        userId: auth?.idUser,
                        dateToLookFor: dateForOpportunityList,
                        isForToday: isForToday
                    }
                }
            );
            setOpportunities(response?.data);

        } catch (err) {
            if (err?.response?.status === 403) {
                navigate('/signIn', { state: { from: location }, replace: true });
            }
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchOppurtinities();
    }, [dateForOpportunityList])
    return (

        < >
            {isLoading && <p>Chargement en cours</p>}
            <div className="opportunity-container">
                {!isLoading && (opportunities.length ?

                    opportunities.map(opportunity => (
                        <div className="opportunity-item">
                            <Opportunity key={opportunity.idOpportunity}
                                opportunity={opportunity}
                                setOpportunities={setOpportunities}
                                opportunities={opportunities}
                            />
                        </div>

                    ))


                    : <p className="text-center">You haven't set any goals for {dateForOpportunityList}. Click here to set your daily goals</p>
                )}
            </div>

        </>
    );
};

export default OpportunityList;