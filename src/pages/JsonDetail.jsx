import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const JsonDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                const [postRes, commentsRes] = await Promise.all([
                    fetch(`http://localhost:3001/api/posts/${postId}`),
                    fetch(`http://localhost:3001/api/comments/${postId}`)
                ]);
                if (!postRes.ok || !commentsRes.ok) throw new Error('Failed to fetch post details.');
                setPost(await postRes.json());
                setComments(await commentsRes.json());
            } catch (error) {
                console.error("Error fetching post details:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostData();
    }, [postId]);

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Failed to load data. (Error: ${error.message})`} />;
    if (!post) return <ErrorMessage message="Post not found." />;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <button onClick={() => navigate('/json-data')} className="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to All Posts
            </button>
            {error && <ErrorMessage message={error.message} />}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 capitalize">{post.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{post.content}</p>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments ({comments.length})</h2>
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white capitalize">{comment.author}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JsonDetail;
