import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Modal = ({ isOpen, onClose, children, className }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`bg-white p-5 rounded-md relative ${className}`}>
                        <button className="absolute top-2 right-2 text-gray-500 p-2" onClick={onClose}>
                            <IoIosCloseCircleOutline  size={24} />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
