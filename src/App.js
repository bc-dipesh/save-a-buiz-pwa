import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import FundraiserListScreen from './screens/FundraiserListScreen';
import FundraiserScreen from './screens/FundraiserScreen';
import HomeScreen from './screens/HomeScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserSignInScreen from './screens/UserSignInScreen';
import UserProfileScreen from './screens/UserProfileScreen';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/fundraisers" component={FundraiserListScreen} exact />
          <Route path="/fundraisers/:id" component={FundraiserScreen} />
          <Route path="/sign-in" component={UserSignInScreen} />
          <Route path="/users/profile" component={UserProfileScreen} />
          <Route path="/register" component={UserRegisterScreen} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
