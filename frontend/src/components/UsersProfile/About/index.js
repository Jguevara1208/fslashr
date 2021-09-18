import about from './About.module.css';
import { Link } from  'react-router-dom';

function About({user, followers, following}) {
    return (
        <div className={about.container}>
            <p style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '40px', marginTop: '10px' }}>About</p>
            <div className={about.wrapper}>
                <p className={about.name}>{user.username}</p>
                <p className={about.bio}>{user.bio}</p>
                <p className={about.following}>Following</p>
                <div className={about.follow}>
                    {following.length > 0 
                    ? 
                    following.map(follow => (
                        <div className={about.followWrapper} key={follow.id}>
                            <Link to={`/users/${follow.id}`}><div className={about.avatar} style={{backgroundImage: `url('${follow.avatarUrl}')`}}/></Link>
                            <p className={about.username}>{follow.username}</p>
                        </div>
                    ))
                    :
                    <p>This user isn't following anyone.</p>
                    }
                </div>
                <p className={about.following}>Followers</p>
                <div className={about.follow}>
                    {followers.length > 0
                        ?
                        followers.map(follow => (
                            <div className={about.followWrapper} key={follow.id}>
                                <Link to={`/users/${follow.id}`}><div className={about.avatar} style={{ backgroundImage: `url('${follow.avatarUrl}')` }} /></Link>
                                <p className={about.username}>{follow.username}</p>
                            </div>
                        ))
                        :
                        <p>No one is following this user.</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default About;