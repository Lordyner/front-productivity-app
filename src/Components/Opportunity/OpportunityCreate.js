import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const OpportunityCreate = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [opportunityState, setOpportunityState] = useState(false);

    const request = {
        date: date,
        description: description,
        state: opportunityState,
        title: title

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/opportunities', {
                date: request.date,
                description: request.description,
                state: request.state,
                title: request.title,
                user: { idUser: auth?.idUser }
            },
                {
                    withCredentials: true,
                    responseType: 'json',
                    headers: { 'Content-Type': 'application/json' },

                }
            );
            console.log(response);
            if (response?.status === 201) {
                navigate('/dashboard', { state: { from: location }, replace: true });
            }

        } catch (err) {
            navigate('/signIn', { state: { from: location }, replace: true });
        } finally {
        }

    }
    return (
        <div className="flex-form-container">
            <form onSubmit={handleSubmit} className="form">
                <input
                    type='text'
                    id='opportunityTitle'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <textarea
                    id='opportunityDescription'
                    placeholder='Description'
                    maxLength="400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                ></input>
                <div className="checkbox-group">
                    <label htmlFor="opportunityAccomplished">Opportunity accomplished : </label>
                    <input id="opportunityAccomplished"
                        type="checkbox"
                        value={opportunityState}
                        onChange={(e) => setOpportunityState(!opportunityState)} />

                </div>


                <button type='submit'>Create</button>
            </form>
        </div>
    );
};

export default OpportunityCreate;