import SignUp from './Components/Authentication/SignUp';
import Home from './Components/Layout/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import SignIn from './Components/Authentication/SignIn';
import Dashboard from './Components/Dashboard';
import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';
import NewOpportunity from './Components/Opportunity/OpportunityCreate';
import OpportunityDetails from './Components/Opportunity/OpportunityDetails';
import OpportunityUpdate from './Components/Opportunity/OpportunityUpdate';


function App() {

  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Routes publics */}
        <Route index element={<Home />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        {/* Routes privées */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newOpportunity" element={<NewOpportunity />} />
            <Route path="/opportunity/details" element={<OpportunityDetails />} />
            <Route path="/opportunity/update" element={<OpportunityUpdate />} />
          </Route>
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
