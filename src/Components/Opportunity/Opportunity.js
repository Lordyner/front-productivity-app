import { Link } from "react-router-dom";
import { IoCloseOutline, IoTrophySharp } from 'react-icons/io5';
import { axiosPrivate } from "../../api/axios";




const Opportunity = ({ opportunity, setOpportunities, opportunities }) => {

    const handleDelete = async () => {
        try {
            const responseDelete = await axiosPrivate.delete('/opportunities/opportunity/' + opportunity.idOpportunity, {
                withCredentials: true,
                responseType: 'json',
            });
            if (responseDelete?.status !== 204 || responseDelete?.status !== 200) {
                //TODO show error dialogue
            }
            const reducedOpportunities = opportunities.filter(function (value, index, arr) {
                return value !== opportunity;
            });
            setOpportunities(reducedOpportunities);
        } catch (err) {

        }
    }


    return (
        <>

            <Link to='/opportunity/update' className="opportunity-card-link" state={{ opportunity: opportunity }}
                href='#'>
                <div className="opportunity-top-bar-container">
                    <h3 className="m-0">
                        {opportunity.title}
                    </h3>

                </div>
                <div className="opportunity-text-container">
                    <p>{opportunity.description}</p>
                </div>
            </Link>
            <div className="opportunity-icons-container">
                <a href='#' className="icon" onClick={handleDelete}  ><IoCloseOutline /></a>
            </div>

        </>
    );
};

export default Opportunity;