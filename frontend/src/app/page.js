"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_BLOGS_QUERY = gql`
  query GetAllBlogs {
    getAllBlogs {
      id
      title
      author
      content
    }
  }
`;

export default function BlogList() {
  const { loading, error, data } = useQuery(GET_ALL_BLOGS_QUERY);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blogs = data.getAllBlogs;

  if (blogs.length === 0) {
    return <p>No blogs found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          Blog Dashboard
        </h1>
        <Link href="/blog/addblog">
          <button className="btn btn-primary px-6 py-2 rounded-lg shadow hover:scale-110 transition-transform duration-300">
            + Add Blog
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`} className="block group">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-72 p-5">
              <div className="card-body p-0 flex flex-col flex-grow">
                {/* Title */}
                <h2 className="card-title text-xl font-extrabold mb-1">{blog.title}</h2>

                {/* Author */}
                <p className="text-sm text-gray-500 mb-3">
                  Written by <span className="font-medium">{blog.author}</span>
                </p>

                {/* Content snippet with fade */}
                <div className="relative flex-grow overflow-hidden">
                  <p className="line-clamp-5 text-sm text-gray-700 leading-relaxed">
                    {blog.content}
                  </p>
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-base-100" />
                </div>

                {/* Show more */}
                <div className="mt-3">
                  <span className="text-primary font-semibold group-hover:underline cursor-pointer">
                    Show more &gt;&gt;
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
