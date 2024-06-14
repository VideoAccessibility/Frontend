import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || 'Page Not Found';

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Helmet>
        <title>{message}</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h6" component="h6" paddingBottom={"30px"}>
          {message}
        </Typography>
        <Button
        variant="contained"
          className="category-btn"
          sx={{
            p: "5px 15px",
            borderRadius: "30px",
            fontSize: "large",
          }}
          aria-label="Back to home button"
          onClick={handleBackToHome}
        >
           Back to Home
        </Button>
      </Box>
    </Container>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;
