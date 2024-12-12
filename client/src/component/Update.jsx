import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'An unexpected error occurred.');
      } else {
        setError('');
        navigate('/all'); // Redirect to 'all' route after a successful update
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error(err);
    }
  };

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'An unexpected error occurred.');
      } else {
        setError('');
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <h2 className="text-center mt-4">Update User</h2>
      <div className="container-sm">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Type your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Update;
