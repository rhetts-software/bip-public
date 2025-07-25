"use client";
import { useState } from "react";
import supabase from "../modules/supabase.client";

export default function Forum({
  onPost,
  user_id,
  first_name,
}: {
  onPost: () => void;
  user_id: string;
  first_name: string;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content cannot be empty or just spaces.");
      return;
    }

    setErrorMessage(""); // Clear error message

    // Insert into forum_posts, not the summary view
    const { data, error } = await supabase.from("forum_posts").insert([
      {
        user_id,
        title: title.trim(),
        content: content.trim(),
        first_name,
      },
    ]);

    if (error) {
      console.error("Error posting to forum:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } else {
      setTitle("");
      setContent("");
      onPost();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Start a new discussion
      </h2>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full bg-gray-700 text-white mb-4 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full bg-gray-700 text-gray-200 p-3 rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      ></textarea>

      <div className="flex justify-end mt-4">
        <button
          onClick={handlePost}
          disabled={!title.trim() || !content.trim()}
          className={`px-5 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !title.trim() || !content.trim()
              ? "bg-blue-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Post
        </button>
      </div>
      {/* Like/Dislike buttons are not needed here since this is the post creation form */}
    </div>
  );
}