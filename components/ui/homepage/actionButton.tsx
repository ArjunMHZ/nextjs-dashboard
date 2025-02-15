'use client'

import { FC } from "react";

interface ActionButtonProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const ActionButton: FC<ActionButtonProps> = ({ value, setValue }) => {

    const increment = () => {
        setValue((prev) => prev + 1);
    };

    const decrement = () => {
        setValue((prev) => Math.max(1, prev - 1)); // Prevent going below 1
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10); // Convert string to number
        setValue(Math.max(1, newValue || 1)); // Ensure the value is at least 1
    }
    return ( 
        <div className="flex items-center">
        <button
            onClick={decrement}
            className={`bg-blue-500 text-white p-2 rounded-l focus:outline-none focus:ring ${value <= 1 ? 'opacity-90 cursor-not-allowed' : ''
                }`}
        >
            -
        </button>
        <input
            type="number"
            value={value}
            onChange={handleChange} // Allow direct input
            className="border border-gray-300 text-center w-16 focus:border-black focus:ring focus:ring-blue-200"
        />
        <button
            onClick={increment}
            className="bg-blue-500 text-white p-2 rounded-r focus:outline-none focus:ring"
        >
            +
        </button>
    </div>
     );
}
 
export default ActionButton;