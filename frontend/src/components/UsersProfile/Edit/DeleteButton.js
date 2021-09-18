import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../../store/userInfo';
import { AiOutlineDelete } from 'react-icons/ai'
import aDelete from '../Albums/AlbumDelete/AlbumDelete.module.css';

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
            <div className={aDelete.wrapper}>
                <button className={aDelete.button} onClick={openMenu}>
                    <AiOutlineDelete className={aDelete.delete} />
                </button>
                {showMenu && (
                    <div className={aDelete.dropDownTwo}>
                        <p>Delete this photo?</p>
                        <button className={aDelete.deleteButton} onClick={deletePhoto}>Delete</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default DeleteButton;