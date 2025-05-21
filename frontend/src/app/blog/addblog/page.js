"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADD_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $author: String!) {
    createBlog(title: $title, content: $content, author: $author) {
      id
      title
    }
  }
`;

export default function AddBlog() {
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const router = useRouter();
  const [createBlog, { loading, error }] = useMutation(ADD_BLOG);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createBlog({ variables: form });
    const newBlogId = data.createBlog.id;
    router.push(`/blog/${newBlogId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-primary">Add a New Blog</h1>

        <form onSubmit={handleSubmit} className="form-control space-y-4 flex flex-col gap-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Blog Title</span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Enter the blog title"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Content</span>
            </div>
            <textarea
              name="content"
              placeholder="Write the blog content here..."
              value={form.content}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-40 rounded-lg"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Author Name</span>
            </div>
            <input
              type="text"
              name="author"
              placeholder="Enter your name"
              value={form.author}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg"
              required
            />
          </label>

          <button
            type="submit"
            className={`btn btn-primary w-full rounded-xl shadow hover:scale-105 transition-transform duration-300 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Blog"}
          </button>

          {error && (
            <div className="alert alert-error mt-4">
              <span>Error: {error.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
