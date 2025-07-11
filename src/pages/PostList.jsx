import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Components ---
const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Oops! </strong><span className="block sm:inline">{message}</span>
    </div>
);

const SearchBar = ({ onSearch }) => (
    <div className="relative w-full max-w-lg mx-auto mb-10">
        <input
            type="text"
            placeholder="Search posts by title..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-3 text-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-label="Search posts"
        />
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const buttonStyle = "px-6 py-2 text-lg font-semibold rounded-md transition-colors shadow";
    const activeStyle = "bg-blue-600 text-white hover:bg-blue-700";
    const disabledStyle = "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed";

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={isFirstPage} className={`${buttonStyle} ${isFirstPage ? disabledStyle : activeStyle}`}>Previous</button>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage} className={`${buttonStyle} ${isLastPage ? disabledStyle : activeStyle}`}>Next</button>
        </div>
    );
};

const Card = ({ post }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="h-full"
        >
            <Link to={`/posts/${post.id}`} className="block group h-full">
                <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md flex flex-col justify-between">
                    <div className="p-5">
                        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize truncate">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{post.body.substring(0, 100)}...</p>
                    </div>
                    <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                        <span className="inline-flex items-center font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">Read more
                            <svg className="w-3 h-3 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// --- Main PostList Logic ---
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 12;

    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => { setPosts(data); setError(null); })
            .catch(err => { console.error("Fetch error:", err); setError(err.message); setPosts([]); })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Failed to load posts. (Error: ${error})`} />;

    return (
        <div>
            {/* <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">All Posts</h1> */}
            <SearchBar onSearch={setSearchTerm} />
            <AnimatePresence>
                {paginatedPosts.length > 0 ? (
                    <motion.div
                        key="post-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {paginatedPosts.map((post) => <Card key={post.id} post={post} />)}
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">No posts found.</h2>
                    </motion.div>
                )}
            </AnimatePresence>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default PostList;