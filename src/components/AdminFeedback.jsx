import React, { useEffect, useState } from 'react';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/feedback', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        console.log('Feedback Data:', data); // Log the received data

        setFeedback(data.feedback || []);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSelectFeedback = (item) => {
    setSelectedFeedback(item);
    setReply('');
  };

  const handleSendReply = async () => {
    if (!selectedFeedback || !reply) return;

    const token = localStorage.getItem('adminToken');
    setLoading(true);
    try {
      const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/feedback/reply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: selectedFeedback.userId,
          userEmail: selectedFeedback.email,
          feedback: reply
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Reply sent successfully');
        setReply('');
        setSelectedFeedback(null);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-10">
      <div className="flex flex-1 space-x-8">
        {/* Feedback List */}
        <div className="w-1/2 p-6 bg-gray-200 rounded-lg overflow-auto shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-6">All Feedback</h2>
          {feedback.length > 0 ? feedback.map((item, index) => (
            <div 
              key={index} 
              className={`p-4 mb-4 bg-white rounded-lg border-l-4 ${selectedFeedback === item ? 'border-orange-700' : 'border-orange-500'} shadow-sm cursor-pointer`}
              onClick={() => handleSelectFeedback(item)}
            >
              <div className="text-black">
                <span className="font-semibold text-orange-700">{item.email}</span>: {item.message || 'No feedback text'}
              </div>
            </div>
          )) : <p className="text-gray-700">No feedback available.</p>}
        </div>

        {/* Reply Form */}
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-md">
          {selectedFeedback ? (
            <>
              <h2 className="text-2xl font-semibold text-black mb-4">Reply to {selectedFeedback.email}</h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                value={reply}
                onChange={handleReplyChange}
                placeholder="Type your reply here..."
              />
              <div className="flex justify-end mt-4">
                <button
                  className={`bg-orange-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSendReply}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-700">Select feedback to reply.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;


