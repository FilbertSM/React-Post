import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Welcome to React Posts
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                This is a demo application built with React, Tailwind CSS, and React Router.
                Explore the posts page to see a list of articles fetched from a public API.
            </p>
            <Link to="/posts" className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                View All Posts
            </Link>
        </div>
    );
};

export default Home;
