import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSnackbar, withSnackbar } from 'notistack';
import Footer from './components/Footer';
import Header from './components/Header';
import FundraiserListScreen from './screens/FundraiserListScreen';
import FundraiserScreen from './screens/FundraiserScreen';
import HomeScreen from './screens/HomeScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserSignInScreen from './screens/UserSignInScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AboutScreen from './screens/AboutScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import WhatIsCrowdfundingScreen from './screens/WhatIsCrowdfundingScreen';
import LegalContactInfoScreen from './screens/LegalContactInfoScreen';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import CommonQuestionScreen from './screens/CommonQuestionScreen';
import SupportedProvinceScreen from './screens/SupportedProvinceScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';

function App() {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const onServiceWorkerUpdate = (registration) => {
    setWaitingWorker(registration && registration.waiting);
    setIsNewVersionAvailable(true);
    console.log(waitingWorker, isNewVersionAvailable);
  };

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setIsNewVersionAvailable(false);
    window.location.reload();
  };

  // render the snackbar button
  const refreshAction = () => (
    <>
      <Button style={{ color: 'cyan' }} className="snackbar-button" size="small" onClick={updateServiceWorker}>
        Refresh
      </Button>
    </>
  );

  // make app work offline
  serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });

  // show snackbar with refresh button
  if (isNewVersionAvailable) {
    enqueueSnackbar('A new version of the app is available. Please refresh the page to see latest content', {
      persist: true,
      variant: 'default',
      action: refreshAction(),
    });
  }

  return (
    <>
      <Router>
        <Header />
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={FundraiserListScreen} exact />
          <Route path="/fundraisers" component={FundraiserListScreen} exact />
          <Route path="/fundraisers/:id" component={FundraiserScreen} exact />
          <Route path="/sign-in" component={UserSignInScreen} exact />
          <Route path="/users/profile" component={UserProfileScreen} exact />
          <Route path="/register" component={UserRegisterScreen} exact />
          <Route path="/about" component={AboutScreen} exact />
          <Route path="/how-it-works" component={HowItWorksScreen} exact />
          <Route path="/what-is-crowdfunding" component={WhatIsCrowdfundingScreen} exact />
          <Route path="/legal" component={LegalContactInfoScreen} exact />
          <Route path="/common-questions" component={CommonQuestionScreen} exact />
          <Route path="/supported-provinces" component={SupportedProvinceScreen} exact />
          <Route component={PageNotFoundScreen} />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default withSnackbar(App);
