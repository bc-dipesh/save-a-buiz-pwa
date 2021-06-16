import { Button } from '@material-ui/core';
import { useSnackbar, withSnackbar } from 'notistack';
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loader from './components/Loader';
import Notifier from './components/Notifier';
import ScrollToTop from './components/ScrollToTop';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const PageNotFoundScreen = lazy(() => import('./screens/PageNotFoundScreen'));
const Footer = lazy(() => import('./components/Footer'));
const AboutScreen = lazy(() => import('./screens/AboutScreen'));
const UserProfileScreen = lazy(() => import('./screens/UserProfileScreen'));
const HowItWorksScreen = lazy(() => import('./screens/HowItWorksScreen'));
const UserListScreen = lazy(() => import('./screens/UserListScreen'));
const UserEditScreen = lazy(() => import('./screens/UserEditScreen'));
const CommonQuestionScreen = lazy(() => import('./screens/CommonQuestionScreen'));
const LegalContactInfoScreen = lazy(() => import('./screens/LegalContactInfoScreen'));
const WhatIsCrowdfundingScreen = lazy(() => import('./screens/WhatIsCrowdfundingScreen'));
const UserFundraiserScreen = lazy(() => import('./screens/UserFundraiserScreen'));
const FundraiserListScreen = lazy(() => import('./screens/FundraiserListScreen'));
const UserSignInScreen = lazy(() => import('./screens/UserSignInScreen'));
const UserRegisterScreen = lazy(() => import('./screens/UserRegisterScreen'));
const SupportedProvinceScreen = lazy(() => import('./screens/SupportedProvinceScreen'));
const StartFundraiserScreen = lazy(() => import('./screens/StartFundraiserScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const FundraiserScreen = lazy(() => import('./screens/FundraiserScreen'));

function App() {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});
  const { enqueueSnackbar } = useSnackbar();

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
      <Button
        style={{ color: 'cyan' }}
        className="snackbar-button"
        size="small"
        onClick={updateServiceWorker}
      >
        Refresh
      </Button>
    </>
  );

  const onServiceWorkerUpdate = (registration) => {
    setWaitingWorker(registration && registration.waiting);
    setIsNewVersionAvailable(true);
    console.log(waitingWorker, isNewVersionAvailable);
  };

  // make app work offline
  serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });

  // show snackbar with refresh button
  if (isNewVersionAvailable) {
    enqueueSnackbar(
      'A new version of the app is available. Please refresh the page to see latest content',
      {
        persist: true,
        variant: 'default',
        action: refreshAction(),
      }
    );
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <Notifier />
          <Suspense fallback={<Loader />}>
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
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </Router>
    </>
  );
}

export default withSnackbar(App);
