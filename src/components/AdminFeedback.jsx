import React, { useEffect, useState } from 'react';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

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
        setFeedback(data.feedback);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    const userFeedback = feedback.filter(item => item.userId === user.id);
    setSelectedFeedback(userFeedback);
    setReplies([]); 
  };

  const handleSendReply = async () => {
    if (!selectedUser || !reply.trim()) return;

    const token = localStorage.getItem('adminToken');
    const newReply = {
      userId: selectedUser.id,
      userEmail: selectedUser.email, // Include the user's email
      feedback: reply,
    };

    try {
      const response = await fetch('https://foodbridge-backend-bd8l.onrender.com/api/admin/feedback/reply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReply)
      });

      if (response.ok) {
        setReplies([newReply, ...replies]);
        setReply("");
      } else {
        console.error('Error sending reply:', await response.json());
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 flex flex-col bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">User Feedback</h1>

        <div className="flex flex-1">
          {/* Feedback List */}
          <div className="w-1/3 p-4 bg-gray-200 rounded-lg overflow-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a User</h2>
            {feedback.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 mb-2 cursor-pointer rounded-lg ${selectedUser && selectedUser.id === item.userId ? 'bg-orange-600 text-white' : 'bg-white text-gray-800'}`} 
                onClick={() => handleUserSelect(item.user)}
              >
                <div className="font-bold text-lg">{item.user.username}</div>
                <div className="text-sm text-gray-600">{item.message}</div>
                <div className="text-xs text-gray-500 mt-1">{item.user.email}</div> {/* Display user email */}
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 bg-gray-100 rounded-lg ml-4 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Feedback from {selectedUser ? selectedUser.username : 'Select a User'}</h2>
            
            <div className="flex-1 overflow-auto mb-4">
              {replies.map((item, index) => (
                <div key={index} className="p-4 mb-2 bg-orange-100 rounded-lg border-l-4 border-orange-600 shadow-sm">
                  <div className="text-gray-700">
                    <span className="font-semibold text-orange-700">{item.username || 'Admin'}</span>: {item.feedback}
                  </div>
                </div>
              ))}

              {selectedFeedback.map((item, index) => (
                <div key={index} className="p-4 mb-2 bg-white rounded-lg border-l-4 border-orange-600 shadow-sm">
                  <div className="text-gray-700">
                    <span className="font-semibold text-orange-700">{item.user.username}</span>: {item.feedback}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Type your reply..." 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none" 
                  disabled={!selectedUser}
                />
                <button 
                  onClick={handleSendReply}
                  className="ml-4 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  disabled={!selectedUser || reply.trim() === ""}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
