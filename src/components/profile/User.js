import axios from 'axios';
import Rating from './Rating';


export default function User() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        async function getUser() {
      const response = await axios.get(`https://emazad.herokuapp.com/profile/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        setUser(response.data);
        console.log(response.data);
    }
      }, []) 
    
    if (!user) {
        return null;
    }
    
    return (
        <div>
        <h1>{user.username}</h1>
        <p>{user.email}</p>
        <Rating/>

        </div>
    );
    }
