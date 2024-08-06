import React from 'react';
import { Link } from 'react-router-dom';
import loginBackground from '../images/login-background.png';
import appleLogo from '../images/apple-logo.svg';
import googleLogo from '../images/google-logo.svg';

function InputField({ label, placeholder, type }) {
  return (
    <div className="flex flex-col w-full min-h-[59px]">
      <label htmlFor={`${type}Input`} className="gap-2.5 self-start text-sm text-black">
        {label}
      </label>
      <input
        type={type}
        id={`${type}Input`}
        placeholder={placeholder}
        className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full text-xs rounded-xl max-w-[404px] min-h-[32px] text-zinc-300"
      />
    </div>
  );
}

function Button({ text, className }) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <button className="flex overflow-hidden gap-2.5 items-center py-2.5 pl-2.5 w-full bg-yellow-800 rounded-xl max-w-[404px] min-h-[32px]">
        <span className="z-10 self-center mt-0 text-sm font-bold text-white">{text}</span>
      </button>
    </div>
  );
}

function SocialSignIn({ provider }) {
  const iconSrc = provider === 'Google' ? googleLogo : appleLogo;
  const buttonWidth = provider === 'Apple' ? 'w-[190px]' : '';

  return (
    <button className={`flex overflow-hidden flex-col justify-center self-stretch px-5 py-1 my-auto rounded-xl ${buttonWidth}`}>
      <div className="flex gap-2.5 items-center">
        <img loading="lazy" src={iconSrc} alt={`${provider} logo`} className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        <span className="self-stretch my-auto">Sign in with {provider}</span>
      </div>
    </button>
  );
}


function LoginPage() {
  return (
    <main className="overflow-hidden pl-20 bg-white max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-2.5 items-start self-stretch my-auto min-h-[583px] max-md:mt-10">
            <div className="flex flex-col items-center rounded-none min-w-[240px] w-[404px]">
              <div className="flex flex-col self-stretch w-full">
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
                    <Link to="/forgot-password" className="self-start text-xs text-blue-900">
                      forgot password
                    </Link>
                  </div>
                  <div className="flex gap-1.5 self-start mt-6 text-xs font-medium text-black">
                    <input type="checkbox" id="rememberMe" className="h-2.5 w-[9px]" />
                    <label htmlFor="rememberMe">Remember Me</label>
                  </div>
                  <Button text="Login" className="mt-6" />
                  <Link to="/signup" className="self-start mt-5 ml-4 text-xs font-medium text-blue-700 max-md:ml-2.5">
                    Don't Have an Account? Create One
                  </Link>
                </form>
                <div className="overflow-hidden gap-2.5 self-stretch px-1 mt-1.5 w-5 text-xs font-medium text-black whitespace-nowrap bg-white">
                  Or
                </div>
                <div className="flex gap-5 items-center self-stretch mt-24 text-xs font-medium text-black max-md:mt-10">
                  <SocialSignIn provider="Google" />
                  <SocialSignIn provider="Apple" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src={loginBackground}
            alt="Login page illustration"
            className="object-contain grow w-full aspect-[0.75] rounded-[45px_0px_0px_45px] max-md:mt-10 max-md:max-w-full"
          />
        </aside>
      </div>
    </main>
  );
}

export default LoginPage;

