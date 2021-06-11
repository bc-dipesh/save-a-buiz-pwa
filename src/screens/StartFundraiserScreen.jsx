import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button, Container, Form, InputGroup, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createFundraiser } from '../actions/fundraiserActions';
import Message from '../components/Message';
import { FUNDRAISER_CREATE_RESET } from '../constants/fundraiserConstants';

const StartFundraiserScreen = ({ history }) => {
  const API_END_POINT = 'https://save-a-buiz-api.herokuapp.com/api/v1/file-uploads/fundraiser-image';

  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [youTubeVideoLink, setYouTubeVideoLink] = useState('');

  const imageUploadHanlder = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setIsImageUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data: { data } } = await axios.post(`${API_END_POINT}`, formData, config);
      setImage(data);
      setIsImageUploading(false);
    } catch (error) {
      setIsImageUploading(false);
      (
        <Container className="my-5">
          <Message variant="danger">Something went wrong</Message>
          <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
        </Container>
      );
    }
  };

  const dispatch = useDispatch();
  const { loading, error, fundraiser } = useSelector((state) => state.fundraiserCreate);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/sign-in');
    }
    if (fundraiser) {
      dispatch({ type: FUNDRAISER_CREATE_RESET });
      history.push(`fundraisers/${fundraiser._id}`);
    }
  }, [userInfo, fundraiser, loading, error, dispatch]);

  const submitCreateFundraiserForm = (e) => {
    e.preventDefault();
    dispatch(createFundraiser({
      location,
      title,
      goal,
      description,
      image,
      youTubeVideoLink,
    }));
  };

  if (error) {
    return (
      <Container className="my-5">
        <Message variant="danger">Something went wrong</Message>
        <Button variant="outline-primary" onClick={() => window.location.reload()}>Refresh page ?</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <h1 className="mb-3">Start a Fundraiser</h1>
        <Form onSubmit={submitCreateFundraiserForm}>
          <Form.Group controlId="address" className="mb-4">
            <Form.Label>Where do you live?</Form.Label>
            <Form.Control type="text" placeholder="Ex: Sahayoginagar - 32, Kathmandu" onChange={(e) => setLocation(e.target.value)} value={location} />
          </Form.Group>
          <Form.Group controlId="fundraisingTitle" className="mb-4">
            <Form.Label>What is your fundraiser title?</Form.Label>
            <Form.Control type="text" placeholder="Ex: Help Hari Reopen His Restaurant" onChange={(e) => setTitle(e.target.value)} value={title} />
            <Form.Text className="text-muted">
              Try to include the business name and the purpose.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="fundraisingGoal" className="mb-4">
            <Form.Label>Set your fundraising goal</Form.Label>
            <Form.Control type="number" placeholder="Ex: 50,000" onChange={(e) => setGoal(e.target.value)} value={goal} />
            <Form.Text className="text-muted">
              Keep in mind that transaction fees, including credit and debit
              charges, are deducted from each donation.
              <br />
              To receive money raised, please make sure the person withdrawing has:
              <ul>
                <li>A Citizenship</li>
                <li>A Bank account</li>
                <li>A Company PAN number</li>
              </ul>
              You can always change your goal amount later. If you&apos;re not sure
              where to start, start with the minimum goal that can get your business
              back to working state.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="fundraisingCoverPhoto" className="mb-4">
            <Form.Label>Add a cover photo or video</Form.Label>
            {isImageUploading
              ? <Skeleton variant="text" />
              : <Form.File label={image || 'A high-quality photo or video will help tell your story and build trust with donors.'} onChange={imageUploadHanlder} />}
          </Form.Group>
          <Form.Group controlId="fundraisingYouTubeVideoLink" className="mb-4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" placeholder="Add a YouTube link" onChange={(e) => setYouTubeVideoLink(e.target.value)} value={youTubeVideoLink} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="fundraisingDescription" className="mb-4">
            <Form.Label>Describe your story</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} value={description} />
            <Form.Text className="text-muted">
              Explain about your business, who you are and why you&apos;re fundraising.
              <br />
              To raise the most money for a campaign, make sure you:
              <ul>
                <li>Describe the business that will benefit</li>
                <li>Detail what the funds will be used for</li>
                <li>Explain how soon you need the funds</li>
                <li>Talk about what the support will mean to you and the business</li>
                <li>Share how grateful you will be for help</li>
              </ul>
            </Form.Text>
          </Form.Group>
          <Button className="mb-4" variant="outline-primary" type="submit">
            Submit
          </Button>
          <Form.Group>
            <Form.Text className="text-muted">
              By submitting this form, you agree to the SaveABuiz terms and
              privacy policy.
            </Form.Text>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

StartFundraiserScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default StartFundraiserScreen;
