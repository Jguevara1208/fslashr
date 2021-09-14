import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../../store/userInfo';
import { AiOutlineDelete } from 'react-icons/ai'

function DeleteButton({ photoId }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const deletePhoto = (e) => {
        e.preventDefault();
        dispatch(deleteImage(photoId));
    };

    return (
        <>
            <button onClick={openMenu}>
                <AiOutlineDelete style={{ fontSize: '25px', color: 'rgba(0, 0, 0, .4)' }} />
            </button>
            {showMenu && (
                <div>
                    <p>Are you sure you want to delete this photo?</p>
                    <button onClick={deletePhoto}>Delete</button>
                </div>
            )}
        </>
    );
};

export default DeleteButton;