import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function InputField({ label, name, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col mt-5 w-full font-medium min-h-[58px]">
      <label className="gap-2.5 self-start text-sm text-black">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full text-xs rounded-xl max-w-[404px] min-h-[32px] text-black"
        aria-label={label}
      />
    </div>
  );
}

function Button({ text }) {
  return (
    <div className="flex flex-col pb-2.5 mt-8 bg-slate-100">
      <button
        className="flex overflow-hidden justify-center gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px]"
        type="submit"
      >
        <span className="z-10 self-center mt-0 text-sm font-bold text-white">
          {text}
        </span>
      </button>
    </div>
  );
}


function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        toast.error(`Registration failed: ${data.msg}`);
      }
    } catch (error) {
      toast.error('An error occurred during registration.');
    }
  };

  const inputFields = [
    { label: 'Name', name: 'name', placeholder: 'Enter your name', value: formData.name, onChange: handleChange },
    { label: 'Email address', name: 'email', placeholder: 'Enter your email', type: 'email', value: formData.email, onChange: handleChange },
    { label: 'Password', name: 'password', placeholder: 'Enter your password', type: 'password', value: formData.password, onChange: handleChange },
  ];

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-44 bg-white max-md:px-5 max-md:py-24">
      <ToastContainer />
      <section className="flex flex-col pb-10 max-w-full w-[404px]">
        <div className="flex gap-2.5 items-start pb-16">
          <div className="flex flex-col min-w-[240px] w-[404px] p-6 border border-orange-300 rounded-[45px]">
            <h1 className="gap-2.5 self-start text-3xl font-medium text-black min-h-[53px]">
              Join Us Now
            </h1>
            <form onSubmit={handleSubmit}>
              {inputFields.map((field, index) => (
                <InputField key={index} {...field} />
              ))}
              <div className="flex gap-1.5 self-start mt-5 text-xs font-medium text-black">
                <input type="checkbox" className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label className="ml-2">
                  I agree to the <a href="/terms-and-conditions" className="underline">terms & policy</a>
                </label>
              </div>
              <Button text="Signup" />
            </form>
            <div className="overflow-hidden gap-2.5 self-center px-1 mt-14 w-5 text-xs font-medium text-black whitespace-nowrap bg-white max-md:mt-10">
              Or
            </div>

            <p className="flex flex-col self-center mt-6 max-w-full text-sm font-medium text-black min-h-[23px] w-[129px]">
              Have an account? <Link to="/login"><span className="text-yellow-800">Sign In</span></Link>
            </p>
          </div>
        </div>
        <a href="/" className="z-10 self-center mt-0 text-sm font-medium">
        </a>
      </section>
    </main>
  );
}

export default SignupPage;
