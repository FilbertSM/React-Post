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

const CardDetail = () => {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedCard, setUpdatedCard] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchCardData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/cards/${cardId}`);
                if (!response.ok) throw new Error('Failed to fetch card details.');
                const data = await response.json();
                setCard(data);
                setUpdatedCard({ title: data.title, content: data.content });
            } catch (error) {
                console.error("Error fetching card details:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCardData();
    }, [cardId]);

    const handleUpdateCard = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCard),
            });

            if (!response.ok) {
                throw new Error('Failed to update card');
            }

            const updatedData = await response.json();
            setCard(updatedData);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating card:", error);
            setError(error.message);
        }
    };

    const handleDeleteCard = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/cards/${cardId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete card');
            }

            navigate('/cards');
        } catch (error) {
            console.error("Error deleting card:", error);
            setError(error.message);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Failed to load data. (Error: ${error.message})`} />;
    if (!card) return <ErrorMessage message="Card not found." />;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <button onClick={() => navigate('/cards')} className="mb-6 inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to All Cards
            </button>
            {error && <ErrorMessage message={error.message} />}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 capitalize">{card.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{card.content}</p>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => setShowModal(true)}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleDeleteCard}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Update Card
                                </h3>
                                <div className="mt-2">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        placeholder="Enter title"
                                        value={updatedCard.title}
                                        onChange={(e) => setUpdatedCard({ ...updatedCard, title: e.target.value })}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="content"
                                        placeholder="Enter content"
                                        value={updatedCard.content}
                                        onChange={(e) => setUpdatedCard({ ...updatedCard, content: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleUpdateCard}
                                >
                                    Update
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

export default CardDetail;
