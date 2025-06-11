import { SERVER_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/forms/blogs/${slug}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Blog not found");
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58220]"></div>
        <span className="ml-3 text-gray-600">Loading blog...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F58220] hover:bg-[#E5701C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F58220] transition-colors"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Terminus Group Blog</title>
        <meta name="description" content={blog.summary} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.summary} />
        <meta property="og:image" content={blog.thumbnailImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
            <button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center text-[#F58220] hover:text-[#E5701C] mb-6 group transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-lg font-semibold">Back to Blogs</span>
            </button>

            <div className="mb-6">
              <time className="text-sm text-gray-500" dateTime={blog.createdAt}>
                {formatDate(blog.createdAt)}
              </time>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">{blog.summary}</p>

            {/* Featured Image */}
            <div className="mb-8 aspect-[16/9]">
              <img
                src={blog.thumbnailImage}
                alt={blog.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#F58220] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-l-[#F58220] prose-blockquote:text-gray-600"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Back to blogs button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#F58220] hover:bg-[#E5701C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F58220] transition-colors"
            >
              ← Back to All Blogs
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
