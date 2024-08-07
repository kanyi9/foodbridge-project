import React from 'react';
import appleLogo from '../images/apple-logo.svg';
import googleLogo from '../images/google-logo.svg';
import { Link } from 'react-router-dom';

function InputField({ label, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col mt-5 w-full font-medium min-h-[58px]">
      <label className="gap-2.5 self-start text-sm text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full text-xs rounded-xl max-w-[404px] min-h-[32px] text-zinc-300"
        aria-label={label}
      />
    </div>
  );
}

// Button Component
function Button({ text }) {
  return (
    <div className="flex flex-col pb-2.5 mt-8 bg-slate-100">
      <button className="flex overflow-hidden justify-center gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px]">
        <span className="z-10 self-center mt-0 text-sm font-bold text-white">
          {text}
        </span>
      </button>
    </div>
  );
}

// SocialSignIn Component
function SocialSignIn({ provider, iconSrc }) {
  return (
    <button className="flex overflow-hidden flex-col flex-1 justify-center px-5 py-1 rounded-xl">
      <div className="flex gap-2.5 items-center">
        <img loading="lazy" src={iconSrc} alt={`${provider} logo`} className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        <span className="self-stretch my-auto">Sign in with {provider}</span>
      </div>
    </button>
  );
}

// SignupForm Component
function SignupPage() {
  const inputFields = [
    { label: 'Name', placeholder: 'Enter your name' },
    { label: 'Email address', placeholder: 'Enter your email', type: 'email' },
    { label: 'Password', placeholder: 'Enter your password', type: 'password' },
  ];

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-44 bg-white max-md:px-5 max-md:py-24">
      <section className="flex flex-col pb-10 max-w-full w-[404px]">
        <div className="flex gap-2.5 items-start pb-16">
        <div className="flex flex-col  min-w-[240px] w-[404px] p-6 border border-orange-300 rounded-[45px]">
            <h1 className="gap-2.5 self-start text-3xl font-medium text-black min-h-[53px]">
              Join Us Now
            </h1>
            <form>
              {inputFields.map((field, index) => (
                <InputField key={index} {...field} />
              ))}
              <div className="flex gap-1.5 self-start mt-5 text-xs font-medium text-black">
                <div className="flex shrink-0 self-start h-2.5 rounded-sm w-[9px]" />
                <label>
                  <input type="checkbox" className="sr-only" />
                  <span>
                    I agree to the <a href="#" className="underline">terms & policy</a>
                  </span>
                </label>
              </div>
              <Button text="Signup" />
            </form>
            <div className="overflow-hidden gap-2.5 self-center px-1 mt-14 w-5 text-xs font-medium text-black whitespace-nowrap bg-white max-md:mt-10">
              Or
            </div>
            <div className="flex gap-6 items-start mt-16 text-xs font-medium text-black max-md:mt-10">
              <SocialSignIn provider="Google" iconSrc={googleLogo} />
              <SocialSignIn provider="Apple" iconSrc={appleLogo} />
            </div>
            <p className="flex flex-col self-center mt-6 max-w-full text-sm font-medium text-black min-h-[23px] w-[129px]">
              Have an account? <Link to = "/login"><span className="text-yellow-800">Sign In</span></Link>

            </p>
          </div>
        </div>
        <a href="#" className="z-10 self-center mt-0 text-sm font-medium">
        </a>
      </section>
    </main>
  );
}

export default SignupPage;
