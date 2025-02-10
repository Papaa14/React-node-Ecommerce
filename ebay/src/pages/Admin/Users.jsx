import { useEffect, useState } from 'react';
import axios from '../../components/axios';
import Sidebar from './Sidebar';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/Users')
            .then((response) => {
                const data = response.data;
                console.log(data);
                // Since data is directly an array, we can set it to state
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setError('Invalid response format: Expected an array');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="main">
            <Sidebar />
            <h2>Users List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;