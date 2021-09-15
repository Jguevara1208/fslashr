import { AiOutlineHeart } from 'react-icons'

function FavoriteButton() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button> <AiOutlineHeart /></button>
            </form>
        </>
    );
};

export default FavoriteButton;