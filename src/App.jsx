import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from './actions/snackbarActions';
import Footer from './components/Footer';
import Header from './components/Header';
import Notifier from './components/Notifier';
import ScrollToTop from './components/ScrollToTop';
import AboutScreen from './screens/AboutScreen';
import CommonQuestionScreen from './screens/CommonQuestionScreen';
import FundraiserListScreen from './screens/FundraiserListScreen';
import FundraiserScreen from './screens/FundraiserScreen';
import HomeScreen from './screens/HomeScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import LegalContactInfoScreen from './screens/LegalContactInfoScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import StartFundraiserScreen from './screens/StartFundraiserScreen';
import SupportedProvinceScreen from './screens/SupportedProvinceScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserFundraiserScreen from './screens/UserFundraiserScreen';
import UserListScreen from './screens/UserListScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserSignInScreen from './screens/UserSignInScreen';
import WhatIsCrowdfundingScreen from './screens/WhatIsCrowdfundingScreen';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setIsNewVersionAvailable(false);
    window.location.reload();
  };

  const dispatch = useDispatch();

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <Button
            style={{ color: 'cyan' }}
            onClick={() => {
              updateServiceWorker();
              closeSnackbar(key);
            }}
          >
            dismiss
          </Button>
        ),
      },
    });
  };

  const onServiceWorkerUpdate = (registration) => {
    setWaitingWorker(registration && registration.waiting);
    setIsNewVersionAvailable(true);
  };

  // make app work offline
  serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });

  // show snackbar with refresh button
  if (isNewVersionAvailable) {
    displaySnackbar(
      'A new version of the app is available. Please refresh the page to see latest content.',
      'info'
    );
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <Notifier />
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/search/:keyword" component={FundraiserListScreen} exact />
            <Route path="/fundraisers" component={FundraiserListScreen} exact />
            <Route path="/fundraisers/:id" component={FundraiserScreen} exact />
            <Route path="/start-fundraiser" component={StartFundraiserScreen} exact />
            <Route path="/sign-in" component={UserSignInScreen} exact />
            <Route path="/supported-provinces" component={SupportedProvinceScreen} exact />
            <Route path="/register" component={UserRegisterScreen} exact />
            <Route path="/about" component={AboutScreen} exact />
            <Route path="/user/profile" component={UserProfileScreen} exact />
            <Route path="/user/fundraisers" component={UserFundraiserScreen} exact />
            <Route path="/how-it-works" component={HowItWorksScreen} exact />
            <Route path="/what-is-crowdfunding" component={WhatIsCrowdfundingScreen} exact />
            <Route path="/legal" component={LegalContactInfoScreen} exact />
            <Route path="/common-questions" component={CommonQuestionScreen} exact />
            <Route path="/admin/user-list" component={UserListScreen} exact />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
            <Route component={PageNotFoundScreen} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
