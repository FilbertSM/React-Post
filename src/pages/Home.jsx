import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileCard from '../components/ProfileCard';
import Me from '../components/Me.png';

const Home = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -30 }, // Slide from left
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const textVariants = {
        hidden: { opacity: 0, x: 30 }, // Slide from right
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-12 py-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left Side: Profile Card */}
            <motion.div className="w-full md:w-auto" variants={itemVariants}>
                <ProfileCard
                    name="Filbert S.M."
                    title="Web Developer & AI Engineer"
                    handle="filbertt_sm"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={Me}
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => alert('Contact button clicked!')}
                />
            </motion.div>

            {/* Right Side: Welcome Text */}
            <motion.div className="w-full md:w-1/2 text-center md:text-left" variants={textVariants}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Welcome to JSON Bank
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0">
                    This is a demo application built with React, Tailwind CSS, and React Router.
                    Explore the posts page to see a list of articles fetched from a public API.
                </p>
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