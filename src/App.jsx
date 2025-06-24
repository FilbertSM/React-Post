import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';

// Styles
import './index.css'

// Layout Component to wrap around pages
const Layout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // This effect toggles the 'dark' class on the main <html> element
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        // The 'dark' class on this outer div is no longer needed since we apply it to the <html> tag
        <div className="min-h-screen font-sans">
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                <nav className="container mx-auto px-4 lg:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <NavLink to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            React Posts
                        </NavLink>
                        <div className="flex items-center space-x-4">
                           <NavLink to="/" className={({isActive}) => `text-lg ${isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'hover:text-blue-500'}`}>Home</NavLink>
                           <NavLink to="/posts" className={({isActive}) => `text-lg ${isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'hover:text-blue-500'}`}>Posts</NavLink>
                            <button 
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? '☀️' : '🌙'}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            
            <main className="container mx-auto px-4 lg:px-6 py-8">
                {children}
            </main>

            <footer className="text-center py-4 border-t dark:border-gray-700 mt-8">
                <p>Built with React & Tailwind CSS</p>
                <p>&copy; {new Date().getFullYear()} FilbertSM. All rights reserved.</p>
            </footer>
        </div>
    );
};


function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/posts' element={<PostList />} />
                    <Route path='/posts/:postId' element={<PostDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
