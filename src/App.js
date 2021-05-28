import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import FundraiserScreen from './screens/FundraiserScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/fundraiser/:id" component={FundraiserScreen} />
          <Route path="/login" component={LoginScreen} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
