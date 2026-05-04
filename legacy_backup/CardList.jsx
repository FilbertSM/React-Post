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
            placeholder="Search cards by title..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-3 text-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-label="Search cards"
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

const Card = ({ card }) => {
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
            <Link to={`/cards/${card.id}`} className="block group h-full">
                <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md flex flex-col justify-between">
                    <div className="p-5">
                        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize truncate">{card.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{card.content ? card.content.substring(0, 100) : ''}...</p>
                    </div>
                    <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                        <span className="inline-flex items-center font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">View Details
                            <svg className="w-3 h-3 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// --- Main PostList Logic ---
const CardList = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 12;
    const [showModal, setShowModal] = useState(false);
    const [newCard, setNewCard] = useState({ title: '', content: '' });

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/cards');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCards(data);
                setError(null);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setCards([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
    const paginatedCards = filteredCards.slice(
        (currentPage - 1) * CARDS_PER_PAGE,
        currentPage * CARDS_PER_PAGE
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const handleCreateCard = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCard),
            });

            if (!response.ok) {
                throw new Error('Failed to create card');
            }

            const createdCard = await response.json();
            setCards([...cards, createdCard]);
            setNewCard({ title: '', content: '' });
            setShowModal(false);
        } catch (error) {
            console.error("Error creating card:", error);
            setError(error.message);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Failed to load cards. (Error: ${error})`} />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">All Cards</h1>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowModal(true)}
            >
                Create Card
            </button>
            <SearchBar onSearch={setSearchTerm} />
            <AnimatePresence>
                {paginatedCards.length > 0 ? (
                    <motion.div
                        key="card-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {paginatedCards.map((card) => (
                            <Card key={card.id} card={card} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">No cards found.</h2>
                    </motion.div>
                )}
            </AnimatePresence>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {showModal && (
                <div className="fixed z-20 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Create New Card
                                </h3>
                                <div className="mt-2">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        placeholder="Enter title"
                                        value={newCard.title}
                                        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="content"
                                        placeholder="Enter content"
                                        value={newCard.content}
                                        onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleCreateCard}
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardList;
