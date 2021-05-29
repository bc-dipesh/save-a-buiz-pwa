import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import FundraiserScreen from './screens/FundraiserScreen';
import HomeScreen from './screens/HomeScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/fundraiser/:id" component={FundraiserScreen} />
          <Route path="/login" component={UserLoginScreen} />
          <Route path="/register" component={UserRegisterScreen} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
