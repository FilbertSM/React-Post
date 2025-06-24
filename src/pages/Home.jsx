import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// The Home component with added entrance animations.
const Home = () => {
    
    /**
     * Animation variants for the main container.
     * This orchestrates the animation of its children, making them appear
     * one after another ('staggerChildren').
     */
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Time delay between each child animating in
            },
        },
    };

    /**
     * Animation variants for individual child elements (h1, p, Link).
     * Each item will fade in and slide up from below.
     */
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            className="text-center py-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 
                className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
                variants={itemVariants}
            >
                Welcome to React Posts
            </motion.h1>
            
            <motion.p 
                className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
                variants={itemVariants}
            >
                This is a demo application built with React, Tailwind CSS, and React Router.
                Explore the posts page to see a list of articles fetched from a public API.
            </motion.p>
            
            {/* We wrap the Link in a motion.div to apply the animation variant */}
            <motion.div variants={itemVariants}>
                <Link 
                    to="/posts" 
                    className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                    View All Posts
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Home;