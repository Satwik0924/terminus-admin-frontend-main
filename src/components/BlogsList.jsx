import { SERVER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogsList = ({ className }) => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setCurrentPage(1); // Reset to first page when searching
      fetchBlogsData(1, term);
    }, 300),
    []
  );

  const fetchBlogsData = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
      });

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const response = await axios.get(`${SERVER_URL}/forms/blogs?${params}`);
      const { blogs, pagination } = response.data;

      setBlogsData(blogs);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalBlogs(pagination.totalBlogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      debouncedSearch(searchTerm);
    } else {
      setCurrentPage(1);
      fetchBlogsData(1, "");
    }
  }, [searchTerm, debouncedSearch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBlogsData(page, searchTerm);
    // Scroll to top of blogs section
    document.getElementById("blogs-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div id="blogs-list" className={cn("py-12", className)}>
      {/* Search Bar */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {!loading && (
        <div className="mb-6 text-sm text-gray-600">
          {searchTerm ? (
            <p>
              Found {totalBlogs} result{totalBlogs !== 1 ? "s" : ""} for "{searchTerm}"
            </p>
          ) : (
            <p>
              Showing {totalBlogs} blog{totalBlogs !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58220]"></div>
          <span className="ml-3 text-gray-600">Loading blogs...</span>
        </div>
      ) : blogsData.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.935.636-5.5 1.72A7.962 7.962 0 016 15a8 8 0 108 8 8.001 8.001 0 00-1.172-4.172z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try adjusting your search terms." : "Check back later for new blog posts."}
          </p>
        </div>
      ) : (
        <>
          {/* Blogs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 w-full sm:gap-y-24">
            {blogsData.map((blog) => (
              <div key={blog._id} className="overflow-hidden bg-white relative group">
                <Link to={`/blogs/${blog.slug}`} className="block text-inherit hover:no-underline">
                  {/* Image container */}
                  <div className="relative aspect-[16/9]">
                    <img
                      src={blog.thumbnailImage}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-80"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex justify-top items-top bg-white/50 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                      <div className="p-4">
                        <p className="text-black text-left text-lg font-semibold">Read More</p>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mt-3 mb-2">
                      <time className="text-sm text-gray-500" dateTime={blog.createdAt}>
                        {formatDate(blog.createdAt)}
                      </time>
                    </div>
                    <h3 className="text-lg font-semibold text-black line-clamp-2 tracking-tighter !leading-snug mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-base leading-6 tracking-tighter text-foreground line-clamp-3">{blog.summary}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                    return false;
                  })
                  .map((page, index, array) => {
                    const showEllipsis = index > 0 && array[index - 1] < page - 1;
                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && <span className="px-2 py-1 text-sm text-gray-400">...</span>}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-[#F58220] text-white"
                              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogsList;
