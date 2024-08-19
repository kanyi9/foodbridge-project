import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

function InputField({ label, placeholder, type = 'text', rows, value, onChange, name }) {
  return (
    <div className="flex flex-col mt-5 w-full font-medium min-h-[58px]">
      <label className="gap-2.5 self-start text-sm text-black">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full text-xs rounded-xl max-w-[404px] min-h-[32px] text-black"
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full text-xs rounded-xl max-w-[404px] min-h-[32px] text-black"
          aria-label={label}
        />
      )}
    </div>
  );
}

// Button Component
function Button({ text, onClick }) {
  return (
    <div className="flex flex-col pb-2.5 mt-8 bg-slate-100">
      <button
        onClick={onClick}
        className="flex overflow-hidden justify-center gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px]"
      >
        <span className="z-10 self-center mt-0 text-sm font-bold text-white">
          {text}
        </span>
      </button>
    </div>
  );
}

// ContactUsForm Component
function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [modal, setModal] = useState({ isOpen: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://foodbridge-backend-bd8l.onrender.com/api/feedback', formData);
      setModal({
        isOpen: true,
        message: response.data.message || 'Feedback submitted successfully!',
        type: 'success',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        message: 'Error submitting feedback. Please try again later.',
        type: 'error',
      });
    }
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-44 bg-white max-md:px-5 max-md:py-24">
      <section className="flex flex-col pb-10 max-w-full w-[404px]">
        <div className="flex gap-2.5 items-start pb-16">
          <div className="flex flex-col min-w-[240px] w-[404px] p-6 border border-orange-300 rounded-[45px]">
            <h1 className="gap-2.5 self-start text-3xl font-medium text-black min-h-[53px]">
              Contact Us
            </h1>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email address"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Message"
                placeholder="Enter your message"
                type="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button text="Submit" />
            </form>
            <p className="flex flex-col self-center mt-6 max-w-full text-sm font-medium text-black min-h-[23px] w-[129px]">
              Go back to <Link to="/"><span className="text-yellow-800">Home</span></Link>
            </p>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        message={modal.message}
        type={modal.type}
      />
    </main>
  );
}

export default ContactUs;
