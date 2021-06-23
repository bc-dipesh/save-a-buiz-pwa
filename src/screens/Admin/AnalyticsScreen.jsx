/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Card, CardContent, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import InfoCard from '../../components/InfoCard';
import Message from '../../components/Message';
import useAppVisitCount from '../../hooks/useAppVisitCount';
import useAnalytics from './hooks/useAnalytics';

const AnalyticsScreen = () => {
  const InfoCards = ({ loading, error, data, appVisitCount }) => {
    const usersIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-people"
        viewBox="0 0 16 16"
      >
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    );

    const piggyBankIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-piggy-bank"
        viewBox="0 0 16 16"
      >
        <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
        <path
          fill="evenodd"
          d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"
        />
      </svg>
    );

    const checkIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-clipboard-check"
        viewBox="0 0 16 16"
      >
        <path
          fill="evenodd"
          d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
        />
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
      </svg>
    );

    const graphIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-clipboard-data"
        viewBox="0 0 16 16"
      >
        <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
      </svg>
    );

    if (loading) {
      return (
        <>
          <Row xs={12}>
            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={100} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>

            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={100} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>

            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={100} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Row xs={12}>
            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={80} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>

            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={100} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>

            <Col xs={12} sm={4}>
              <Card className="my-2">
                <CardContent>
                  <Typography variant="h2" component="p">
                    <Skeleton width={40} />
                  </Typography>
                  <Typography className="mt-2" variant="h5" component="p">
                    <Skeleton width={100} />
                  </Typography>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </>
      );
    }

    if (!error) {
      return (
        <>
          <Row xs={12}>
            <Col xs={12} sm={4}>
              <InfoCard icon={usersIcon} title="Users" value={data?.usersCount} />
            </Col>

            <Col xs={12} sm={4}>
              <InfoCard icon={piggyBankIcon} title="Fundraisers" value={data?.fundraisersCount} />
            </Col>

            <Col xs={12} sm={4}>
              <InfoCard
                icon={checkIcon}
                title="Completed Fundraisers"
                value={data?.completedFundraiserCount}
              />
            </Col>
          </Row>
          <Row xs={12}>
            <Col xs={12} sm={4}>
              <InfoCard
                icon={usersIcon}
                title="Users Registered Today"
                value={data?.userRegisteredToday}
              />
            </Col>

            <Col xs={12} sm={4}>
              <InfoCard
                icon={piggyBankIcon}
                title="Fundraisers Created Today"
                value={data?.fundraiserCreatedToday}
              />
            </Col>

            <Col xs={12} sm={4}>
              <InfoCard icon={graphIcon} title="Times App Visited" value={appVisitCount} />
            </Col>
          </Row>
        </>
      );
    }
    return (
      <Container className="my-5">
        <Message variant="danger">Something went wrong</Message>
        <Button variant="outline-primary" onClick={() => window.location.reload()}>
          Refresh page ?
        </Button>
      </Container>
    );
  };

  const { loading, error, data } = useAnalytics();
  const { appVisitCount } = useAppVisitCount();

  const infoCardProps = {
    loading,
    error,
    data,
    appVisitCount,
  };

  return (
    <Container className="mt-3">
      <h1 className="my-3">Important Analytics Gathered From The App</h1>
      <InfoCards {...infoCardProps} />

      <Row xs={12} className="mt-3">
        <Col>
          <Paper className="p-4" elevation={3}>
            <h2 className="mb-5">Monthly App Visitors</h2>
            <ResponsiveContainer height={500}>
              <LineChart data={data?.monthlyAppVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Col>
      </Row>

      <Row xs={12} className="mt-4">
        <Col>
          <Paper className="p-4" elevation={3}>
            <h2 className="mb-5">Monthly Donation Count In Fundraisers</h2>
            <ResponsiveContainer height={500}>
              <BarChart data={data?.monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donationCount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsScreen;
