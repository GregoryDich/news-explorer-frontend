import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    !loggedIn && navigate('/');
  }, [loggedIn, navigate]);
  return <>{loggedIn && children}</>;
}

export default ProtectedRoute;
