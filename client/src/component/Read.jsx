import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user');
      const result = await response.json();
      
      if (!response.ok) {
        setError(result.error || 'An unexpected error occurred.');
      } else {
        setData(result); 
        setError('');
        navigate('/all');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
  
      if (!response.ok) {
        setError(result.error || "Failed to delete user");
        return; // Stop execution if there's an error
      }
  
      // On successful deletion
      if (response.ok){

          setError("User deleted successfully");
          setTimeout(() => {
              setError("");
              getData(); // Refresh the data
            }, 2000);
        }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };


  return (
    <>
      <h2 className="capitalize text-center mt-12 font-bold">All Data</h2>
      <div className="container-sm my-10">
        <div className="row">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {data.map((elem, index) => (
            <div className="col-3 mb-4" key={index}>
              <Card style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Title>User Details</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {elem.name} <br />
                    <strong>Email:</strong> {elem.email} <br />
                    <strong>Age:</strong> {elem.age}
                  </Card.Text>
                  <Link to={`/${elem._id}`}
                    className="me-2 bg-red-500 p-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => deleteUser(elem._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Read;
