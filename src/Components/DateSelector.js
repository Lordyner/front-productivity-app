import { useStoreActions, useStoreState } from 'easy-peasy'
import React from 'react';

const DateSelector = () => {

    const setDateForOpportunityList = useStoreActions((actions) => actions.setDateForOpportunityList);
    const dateForOpportunityList = useStoreState((state) => state.dateForOpportunityList);

    return (
        <div className='flex-container-date'>

            <input type="date" id="date-selector"
                value={dateForOpportunityList}
                onChange={(e) => setDateForOpportunityList(e.target.value)}
            ></input>
        </div>

    );
};

export default DateSelector;