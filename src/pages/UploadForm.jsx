import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUserId(session.user.id);
      }
    };

    getSession();
  }, [navigate]);

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Title and file are required.");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `requests/${fileName}`;

    // 1. Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("books") // make sure 'books' is your bucket name
      .upload(filePath, file);

    if (uploadError) {
      console.error("File upload failed:", uploadError);
      alert("File upload failed!");
      return;
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("books")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;
    if (!publicUrl) {
      alert("Failed to get file URL.");
      return;
    }

    // 3. Insert record into book_requests table
    const { error: insertError } = await supabase.from("book_requests").insert([
      {
        title: title,
        author: author,
        pdf_url: publicUrl,
        submitted_by: userId,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      alert("Error submitting request: " + insertError.message);
      return;
    } else {
      alert("Book upload request submitted successfully!");
      setTitle("");
      setAuthor("");
      setFile(null);
      navigate("/userdashboard");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">📤 Upload Book</h2>

      <input
        type="text"
        placeholder="Book Title"
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author (optional)"
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
        onClick={handleUpload}
      >
        Submit Request
      </button>
    </div>
  );
}
