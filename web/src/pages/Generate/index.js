import React from "react";
import Footer from "../../components/Footer";

export default function Generate() {
  return (
    <div className="w-full bg-[#02121d]">
      <div
        style={{
          backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)`,
        }}
        className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white "
      >
        <h1 className="text-3xl font-bold">Become Tournament Organizer</h1>
        <p className="text-lg text-white/80">Create your own tournament.</p>
      </div>
      <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 py-20 text-white font-body">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto bg-[#0a1f2f] rounded p-6 space-y-6">
          <div className="space-y-2">
            <p className="font-medium text-white/80">Username</p>
            <input
              className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
              placeholder="Enter your username here"
            />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-white/80">Email</p>
            <input
              className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
              placeholder="Enter your email here"
            />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-white/80">Phone number</p>
            <input
              className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
              placeholder="Enter your phone number here"
            />
          </div>
          <div className="w-full flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600 cursor-pointer h-10 font-semibold">
            MINT ORGNZR NFT
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
