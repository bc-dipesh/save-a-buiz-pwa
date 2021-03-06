import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from './actions/snackbarActions';
import Footer from './components/Footer';
import Header from './components/Header';
import Notifier from './components/Notifier';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import useAppVisitCount from './hooks/useAppVisitCount';
import AboutScreen from './screens/About/AboutScreen';
import AnalyticsScreen from './screens/Admin/AnalyticsScreen';
import CreateUserScreen from './screens/Admin/CreateUserScreen';
import EditFundraiserScreen from './screens/Admin/EditFundraiserScreen';
import EditUserScreen from './screens/Admin/EditUserScreen';
import ListFundraiserScreen from './screens/Admin/ListFundraiserScreen';
import ListUserScreen from './screens/Admin/ListUserScreen';
import CommonQuestionScreen from './screens/CommonQuestion/CommonQuestionScreen';
import FundraiserListScreen from './screens/Fundraiser/FundraiserListScreen';
import FundraiserScreen from './screens/Fundraiser/FundraiserScreen';
import HomeScreen from './screens/Home/HomeScreen';
import HowItWorksScreen from './screens/HowItWorks/HowItWorksScreen';
import LegalContactInfoScreen from './screens/LegalContactInfo/LegalContactInfoScreen';
import PageNotFoundScreen from './screens/PageNotFound/PageNotFoundScreen';
import StartFundraiserScreen from './screens/StartFundraiser/StartFundraiserScreen';
import SupportedProvinceScreen from './screens/SupportedProvince/SupportedProvinceScreen';
import UserFundraiserScreen from './screens/User/UserFundraiserScreen';
import UserPasswordResetScreen from './screens/User/UserPasswordResetScreen';
import UserProfileScreen from './screens/User/UserProfileScreen';
import UserRegisterScreen from './screens/User/UserRegisterScreen';
import UserSignInScreen from './screens/User/UserSignInScreen';
import WhatIsCrowdfundingScreen from './screens/WhatIsCrowdfunding/WhatIsCrowdfundingScreen';
import ProcessDonation from './screens/Fundraiser/ProcessDonation';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { isUserAdmin, isUserLoggedIn, reloadPage } from './utils/commonFunctions';
import SubscriberListScreen from './screens/Admin/SubscriberListScreen';
import SubscriberAction from './screens/Admin/SubscriberAction';
import TermsAndConditionScreen from './screens/TermsAndCondition/TermsAndConditionScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicy/PrivacyPolicyScreen';

function App() {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setIsNewVersionAvailable(false);
    reloadPage();
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
            className="snackbar-btn"
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

  const location = useLocation();
  const { updateAppVisitCount } = useAppVisitCount();

  useEffect(() => {
    // update app visit
    updateAppVisitCount();
  }, [location]);

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
      <ScrollToTop />
      <Header />
      <main>
        <Notifier />
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={FundraiserListScreen} exact />
          <Route
            path="/search/:keyword/fundraisers/:pageNumber"
            component={FundraiserListScreen}
            exact
          />
          <Route path="/fundraisers/:pageNumber" component={FundraiserListScreen} exact />
          <Route path="/fundraiser/:id" component={FundraiserScreen} exact />
          <Route path="/sign-in" component={UserSignInScreen} exact />
          <Route path="/forgot-password" component={UserPasswordResetScreen} exact />
          <Route path="/supported-provinces" component={SupportedProvinceScreen} exact />
          <Route path="/register" component={UserRegisterScreen} exact />
          <Route path="/about" component={AboutScreen} exact />
          <Route path="/how-it-works" component={HowItWorksScreen} exact />
          <Route path="/what-is-crowdfunding" component={WhatIsCrowdfundingScreen} exact />
          <Route path="/legal" component={LegalContactInfoScreen} exact />
          <Route path="/common-questions" component={CommonQuestionScreen} exact />
          <Route path="/terms-and-conditions" component={TermsAndConditionScreen} exact />
          <Route path="/privacy-policy" component={PrivacyPolicyScreen} exact />

          <ProtectedRoute
            authenticate={isUserLoggedIn}
            path="/start-fundraiser"
            component={StartFundraiserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserLoggedIn}
            path="/user/profile"
            component={UserProfileScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserLoggedIn}
            path="/user/fundraisers/:pageNumber"
            component={UserFundraiserScreen}
          />
          <ProtectedRoute
            authenticate={isUserLoggedIn}
            path="/process-donation"
            component={ProcessDonation}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/list-user"
            component={ListUserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/user/:id/edit"
            component={EditUserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/list-fundraiser"
            component={ListFundraiserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/fundraiser/:id/edit"
            component={EditFundraiserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/analytics"
            component={AnalyticsScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/create-user"
            component={CreateUserScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/list-news-letter-subscribers"
            component={SubscriberListScreen}
            exact
          />
          <ProtectedRoute
            authenticate={isUserAdmin}
            path="/admin/list-news-letter-subscribers/:id/action/:email"
            component={SubscriberAction}
            exact
          />
          <Route component={PageNotFoundScreen} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
