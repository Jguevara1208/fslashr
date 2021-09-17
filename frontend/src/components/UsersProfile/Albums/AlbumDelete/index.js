import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAlbum } from '../../../../store/userInfo';
import { AiOutlineDelete } from 'react-icons/ai';
import aDelete from './AlbumDelete.module.css';

function AlbumDelete({ albumId }) {
    
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

    const deleteAlbumHandler = (e) => {
        dispatch(deleteAlbum(albumId));
    };

    return (
        <div className={aDelete.wrapper}>
            <button className={aDelete.button} onClick={openMenu}>
                <AiOutlineDelete className={aDelete.delete} />
            </button>
            {showMenu && (
                <div className={aDelete.dropDown}>
                    <p>Delete this album?</p>
                    <button className={aDelete.deleteButton} onClick={deleteAlbumHandler}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default AlbumDelete;