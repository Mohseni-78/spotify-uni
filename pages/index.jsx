import Head from "next/head";
// Imported Components ==========>
import Dashboard from "@/components/Dashboard";
import Loader from "@/components/Loader";
// Imported next-auth ==========>
import {  useSession } from 'next-auth/react'
// Imported Types ==========>
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div className="">
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard/>
    </div>
  );
}