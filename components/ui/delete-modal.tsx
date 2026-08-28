import { Trash2, X } from 'lucide-react';
import React from 'react'
import Button from './button';

interface DeleteModalProps {
    isOpen: boolean,
    onClose: () => void
    headingText?: string
    bodyText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, headingText, bodyText }) => {
    
    if (!isOpen) return null
    
    return (
        <div className='fixed inset-0 bg-black/40 z-50 backdrop-blur-xs flex items-center justify-center px-5'
        onClick={onClose}>

            <div className='bg-white max-w-md w-full px-5 py-7 rounded-lg text-center relative'>

                <div className='p-3 rounded-full bg-black/10 w-fit mx-auto'>
                    <Trash2 className='w-8 h-8  text-red-500 ' />
                </div>

                <h3 className='text-xl font-semibold mt-3 mb-1.5'>{headingText || "Delete Item"}</h3>

                <p className='text-base'>{bodyText || "Are you sure you want to delete this item? This action cannot be undone."}</p>
                
    
                    <Button className='bg-red-500 mt-3 text-center mx-auto'>
                        Confirm Delete
                    </Button>
          
                
                <button
                    onClick={onClose}
                    className='p-1 rounded-full bg-black/10 absolute right-4 top-4 cursor-pointer hover:scale-x-105'>
                    <X className='' />
                </button>
            </div>
        </div>
    )
}

export default DeleteModal