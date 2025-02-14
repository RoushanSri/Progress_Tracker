import React, { useState } from 'react';

const Doubts = () => {
    const [doubts, setDoubts] = useState([]);
    const [newDoubt, setNewDoubt] = useState('');

    const handleAddDoubt = () => {
        if (newDoubt.trim()) {
            setDoubts([...doubts, { text: newDoubt, resolved: false }]);
            setNewDoubt('');
        }
    };

    const handleResolveDoubt = (index) => {
        const updatedDoubts = doubts.map((doubt, i) => 
            i === index ? { ...doubt, resolved: true } : doubt
        );
        setDoubts(updatedDoubts);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Doubts Page</h1>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Ask a Doubt</h2>
                <div className="flex mb-4">
                    <input 
                        type="text" 
                        value={newDoubt} 
                        onChange={(e) => setNewDoubt(e.target.value)} 
                        placeholder="Enter your doubt" 
                        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={handleAddDoubt} 
                        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Doubts Asked</h2>
                    <ul className="space-y-2">
                        {doubts.map((doubt, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm">
                                <span 
                                    className={`flex-grow ${doubt.resolved ? 'line-through text-gray-500' : ''}`}
                                >
                                    {doubt.text}
                                </span>
                                {!doubt.resolved && (
                                    <button 
                                        onClick={() => handleResolveDoubt(index)} 
                                        className="ml-4 bg-green-500 text-white p-1 rounded-lg hover:bg-green-600"
                                    >
                                        Resolve
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Doubts;