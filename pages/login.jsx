import React, { useEffect } from "react";
// import Login from '@/components/Login'
import { getProviders, signIn, useSession } from "next-auth/react";
import Loader from "@/components/Loader";
// import Image from 'next/image';
import Head from "next/head";

const Login = ({ providers }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/";
    }
  }, [session]);

  if (session) return <Loader />;
  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <picture>
        <img
          src="https://rb.gy/y9mwtb"
          height={250}
          width={600}
          className="animate-pulse"
          alt=""
        />
      </picture>
      {providers ?
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        )):
        <p className="text-white text-2xl">Providers in not support in your country</p>}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers: providers },
  };
}
