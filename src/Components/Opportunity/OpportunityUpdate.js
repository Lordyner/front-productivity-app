import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from "react-router-dom";



const OpportunityUpdate = () => {

    const location = useLocation();
    const opportunity = location.state?.opportunity;

    const navigate = useNavigate();
    const { auth } = useAuth();

    const [updateTitle, setUpdateTitle] = useState();
    const [updateDescription, setUpdateDescription] = useState();
    const [updateDate, setUpdateDate] = useState();
    const [updateOpportunityState, setUpdateOpportunityState] = useState();

    useEffect(() => {
        setUpdateTitle(opportunity.title);
        setUpdateDescription(opportunity.description);
        setUpdateDate(opportunity.date);
        setUpdateOpportunityState(opportunity.state);
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.patch('/opportunities/opportunity', {
                idOpportunity: opportunity.idOpportunity,
                date: updateDate,
                description: updateDescription,
                state: opportunity.state,
                title: updateTitle,
                user: { idUser: auth?.idUser },
                state: updateOpportunityState
            })
            if (response?.status !== 204 || response?.status !== 200) {
                //TODO send error
            }
            navigate('/dashboard');

        } catch (err) {

        }
    }
    return (

        <div className="flex-form-container">
            <form onSubmit={handleSubmit} className="form">
                <input
                    type='text'
                    id='opportunityTitle'
                    placeholder='Title'
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                ></input>
                <textarea
                    id='opportunityDescription'
                    placeholder='Description'
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                ></textarea>
                <input type='date'
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                ></input>
                <div className="checkbox-group">
                    <label htmlFor="opportunityAccomplished">Opportunity accomplished : </label>
                    <input id="opportunityAccomplished"
                        type="checkbox"
                        checked={updateOpportunityState}
                        onChange={(e) => setUpdateOpportunityState(!updateOpportunityState)} />

                </div>
                <button type='submit'>Update</button>
            </form >
        </div>




    );
};

export default OpportunityUpdate;