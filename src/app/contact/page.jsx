"use client";

import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import metadata from "../metadata";
import Head from "next/head";
import { LoadingContext } from "@/context/LoadingContext";

export default function ContactPage() {
  const { loading } = useContext(LoadingContext);

  if (loading) return <Spinner />;

  return (
    <>
      <Head>
        <title>{metadata.contact.title}</title>
        <meta name="description" content={metadata.contact.description} />
      </Head>
      <div className="container mx-auto my-20 w-1/3 border text-indigo-600 bg-white">
        <div className="p-5 space-y-5 shadow-xl">
          <h4 className="text-center text-3xl">Contact Us</h4>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <input
                type="text"
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="First Name"
              />
              <input
                type="text"
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Last Name"
              />
              <input
                type="email"
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Email"
              />
              <input
                type="tel"
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Phone"
              />
              <textarea
                cols={10}
                rows={5}
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                placeholder="Write your message..."
              />
            </div>
            <input
              type="submit"
              className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
              value="Send Message"
            />
          </form>
        </div>
      </div>
    </>
  );
}
