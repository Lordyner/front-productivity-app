import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const OpportunityDetails = () => {

    const location = useLocation();
    const opportunity = location.state?.opportunity;
    const axiosPrivate = useAxiosPrivate();
    const getOpportunity = async () => {
        const response = await axiosPrivate.get('/opportunities/opportunity/1', {
            withCredentials: true
        });
    }
    useEffect(() => {
        getOpportunity();
    }, [])

    return (
        <div>
            <h3>{opportunity?.title}</h3>
            <p>{opportunity?.description}</p>
            <p>Task done : </p>
            <input type="checkbox"
                id="taskState"
                value={opportunity?.state}
                disabled
            />
            <p>{opportunity?.date}</p>

        </div>
    );
};

export default OpportunityDetails;