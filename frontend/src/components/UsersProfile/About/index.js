import './About.css'

function About({user, followers, following}) {
    return (
        <>
            <p>{user.username}</p>
            <p>{user.bio}</p>
            <p>Following</p>
            <div className='follow-container'>
                {following && following.map(follow => (
                    <div className='avatar-wrapper' key={follow.id}>
                        <div className='follow-avatar' style={{backgroundImage: `url('${follow.avatarUrl}')`}}/>
                        <p>{follow.username}</p>
                    </div>
                ))}
            </div>
            <p>Followers</p>
            <div className='follow-container'>
                {followers && followers.map(follow => (
                    <div className='avatar-wrapper' key={follow.id}>
                        <div className='follow-avatar' style={{ backgroundImage: `url('${follow.avatarUrl}')` }} />
                        <p>{follow.username}</p>
                    </div>
                ))}
            </div>

        </>
    );
};

export default About;