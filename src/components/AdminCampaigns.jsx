import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCampaigns = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setCampaigns(data);
        } else {
          setError('Unexpected data format');
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted');
        } else {
          setError(`Error fetching events: ${error.message}`);
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchCampaigns();

    return () => controller.abort();
  }, []);

  const handleComplete = async (id) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setError('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`https://foodbridge-backend-bd8l.onrender.com/api/admin/events/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Added Content-Type header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const updatedEvent = await response.json();
      setCampaigns(campaigns.map(event => 
        event.id === id ? updatedEvent : event
      ));
    } catch (error) {
      console.error('Error completing event:', error);
      setError(`Error completing event: ${error.message}`);
    }
  };

  const handleAddEvent = () => {
    navigate('/admin/campaigns/add');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as needed
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Events</h1>
        <button 
          className="mb-6 bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
            {error}
          </div>
        )}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Photo</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Name</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Date</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Location</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Description</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Status</th>
                <th className="py-4 px-6 border-b-2 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-100 transition duration-300">
                    <td className="py-4 px-6 border-b">
                      <img 
                        src={event.picture_url || '/default-event.jpg'} 
                        alt={event.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="py-4 px-6 border-b text-gray-700">{event.name}</td>
                    <td className="py-4 px-6 border-b text-gray-700">{formatDate(event.date)}</td>
                    <td className="py-4 px-6 border-b text-gray-700">{event.location}</td>
                    <td className="py-4 px-6 border-b text-gray-700">{event.description}</td>
                    <td className="py-4 px-6 border-b text-gray-700">
                      {event.completed ? (
                        <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">Complete</span>
                      ) : (
                        <span className="bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-sm">Incomplete</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b flex space-x-2">
                      <button 
                        className={`text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ${event.completed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        onClick={() => handleComplete(event.id)}
                      >
                        {event.completed ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 px-6 text-center text-gray-700">No events available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCampaigns;
