import React from 'react';
import appleLogo from '../images/apple-logo.svg';
import googleLogo from '../images/google-logo.svg';
import { Link } from 'react-router-dom';

function InputField({ label, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col w-full min-h-[59px]">
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

function Button({ text, className }) {
  return (
    <button className={`flex overflow-hidden  justify-center gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px] ${className}`}>
      <span className="z-10 self-center text-sm font-bold text-white">
        {text}
      </span>
    </button>
  );
}

function SocialSignIn({ provider }) {
  const iconSrc = provider === 'Google' ? googleLogo : appleLogo;
  
  return (
    <button className="flex overflow-hidden flex-col justify-center self-stretch px-5 py-1 my-auto rounded-xl">
      <div className="flex gap-2.5 items-center">
        <img loading="lazy" src={iconSrc} alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        <span className="self-stretch my-auto">Sign in with {provider}</span>
      </div>
    </button>
  );
}

function LoginPage() {
  return (
    <main className="relative flex overflow-hidden flex-col justify-center items-center px-20 py-56 bg-white max-md:px-5 max-md:py-24">
      <div className="absolute top-0 left-0 w-full h-full z-0">
      </div>
      <div className="relative flex flex-col pb-40 max-w-full w-[404px] max-md:pb-24 z-10">
        <section className="flex z-10 gap-2.5 items-start min-h-[583px]">
          <div className="flex flex-col  min-w-[240px] w-[404px] p-6 border border-orange-300 rounded-[45px]">
            <h1 className="gap-2.5 self-start text-3xl font-medium text-black min-h-[53px]">
              Welcome back!
            </h1>
            <p className="mt-1.5 mr-9 text-base font-medium text-black max-md:mr-2.5">
              Enter your Credentials to access your account
            </p>
            <form className="flex flex-col mt-16 w-full font-medium max-md:mt-10">
              <InputField label="Email address" placeholder="Enter your email" type="email" />
              <div className="flex mt-5 font-medium">
                <InputField label="Password" placeholder="Enter your password" type="password" />
              </div>
              <a href="/reset-password" className="self-start mt-1 text-xs text-blue-900">
                Forgot Password
              </a>
              <label className="flex gap-1.5 self-start mt-6 text-xs font-medium text-black">
                <input type="checkbox" className="h-4 w-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="flex shrink-0 h-2.5 rounded-sm w-[9px]" />
                Remember Me
              </label>
              <Button text="Login" className="mt-6" />
            </form>
            <p className="self-start mt-5 ml-4 text-xs font-medium text-blue-700 max-md:ml-2.5">
              <Link to= "/signup">Don't Have an Account? Create One</Link>
            </p>
            <div className="flex gap-6 items-center mt-28 text-xs font-medium text-black max-md:mt-10">
              <SocialSignIn provider="Google" />
              <SocialSignIn provider="Apple" />
            </div>
          </div>
        </section>
        <div className="overflow-hidden gap-2.5 self-center px-1 mt-0 mb-0 w-5 text-xs font-medium text-black whitespace-nowrap bg-white max-md:mb-2.5">
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
