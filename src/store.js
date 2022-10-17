import { createStore, action, thunk, computed } from "easy-peasy";

export default createStore({

    dateForOpportunityList: new Date().toISOString().substring(0, 10),
    setDateForOpportunityList: action((state, payload) => {
        state.dateForOpportunityList = payload
    })
});