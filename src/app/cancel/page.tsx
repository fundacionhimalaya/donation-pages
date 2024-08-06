"use client";
import { useRouter } from "next/navigation";

export default function Cancel() {
  const router = useRouter();
  return (
    <div className=" h-screen">
      <div className=" p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm3.707,7.293a1,1,0,0,1,1.414,1.414L13.414,12l3.707,3.707a1,1,0,1,1-1.414,1.414L12,13.414l-3.707,3.707a1,1,0,0,1-1.414-1.414L10.586,12,6.879,8.293a1,1,0,1,1,1.414-1.414L12,10.586Z"
          ></path>
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Donation Cancelled!
          </h3>
          <p className="text-gray-600 my-2">Your donation was not completed.</p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
