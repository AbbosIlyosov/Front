'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or you are not authorized to this page.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#383a49] text-white rounded-xl hover:bg-black transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
