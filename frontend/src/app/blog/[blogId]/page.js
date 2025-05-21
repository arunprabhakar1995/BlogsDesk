"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    getBlogById(id: $id) {
      title
      content
      author
    }
  }
`;

export default function BlogPage() {
  const params = useParams();
  const blogId = params?.blogId;

  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, {
    variables: { id: blogId ?? "" },
    skip: !blogId, // Skip query if no blogId
  });


  if (!blogId) {
    return <p className="p-6 text-center text-gray-500">Invalid blog ID</p>;
  }

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading blog...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">Error: {error.message}</p>;
  }

  if (!data?.getBlogById) {
    return <p className="p-6 text-center text-gray-500">Blog not found.</p>;
  }

  const { title, content, author } = data.getBlogById;

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <article>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {title}
        </h1>

        <p className="text-sm text-gray-500 mb-10">
          Written by <span className="font-bold text-gray-700">{author}</span>
        </p>

        <div className="text-lg leading-relaxed space-y-6">
          {content
            .trim()
            .split("\n")
            .map((para, index) => (
              <p key={index} className="indent-20 text-gray-800">
                {para.trim()}
              </p>
            ))}
        </div>
      </article>
    </main>
  );
}
