import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Helper component for the loading spinner
const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{message}</span>
    </div>
);

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setPosts(data);
                setError(null);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err.message);
                setPosts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Failed to load posts. (Error: ${error})`} />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">All Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <Link to={`/posts/${post.id}`} key={post.id} className="block group">
                        <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="p-5">
                                <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize truncate">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {post.body.substring(0, 100)}...
                                </p>
                            </div>
                            <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                                <span className="inline-flex items-center font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                                    Read more
                                    <svg className="w-3 h-3 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PostList;
