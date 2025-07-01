import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext.jsx';

// Pages    
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import JsonData from './pages/JsonData';
import JsonDetail from './pages/JsonDetail';

// Styles
import './index.css';

// --- Components ---

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const iconVariants = {
        hidden: { rotate: -90, scale: 0, opacity: 0 },
        visible: { rotate: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
        exit: { rotate: 90, scale: 0, opacity: 0 }
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div key={theme} variants={iconVariants} initial="hidden" animate="visible" exit="exit">
                    {theme === 'light' ? '🌙' : '☀️'}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen font-sans">
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
                <nav className="container mx-auto px-4 lg:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <NavLink to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            JSON Bank
                        </NavLink>
                        <div className="flex items-center space-x-4">
                           <NavLink to="/" className={({isActive}) => `text-lg ${isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'hover:text-blue-500'}`}>Home</NavLink>
                           <NavLink to="/posts" className={({isActive}) => `text-lg ${isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'hover:text-blue-500'}`}>Posts</NavLink>
                           <NavLink to="/json-data" className={({isActive}) => `text-lg ${isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'hover:text-blue-500'}`}>JSON Data</NavLink>
                           {/* <ThemeToggle /> */}
                        </div>
                    </div>
                </nav>
            </header>
            
            <main className="container mx-auto px-4 lg:px-6 py-8">
                {children}
            </main>

            <footer className="text-center py-4 border-t border-gray-200 dark:border-gray-700 mt-8">
                <p>Built with React, Tailwind, & Framer Motion</p>
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
                    <Route path='/' element={<Home />} />
                    <Route path='/posts' element={<PostList />} />
                    <Route path='/posts/:postId' element={<PostDetail />} />
                    <Route path='/json-data' element={<JsonData />} />
                    <Route path='/json-data/:postId' element={<JsonDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
