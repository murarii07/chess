import { useSelector } from "react-redux";
function Navbar() {
    const user = useSelector(st => st.user.value);
    return (
        <nav className="navbar">
            <ul>
                CHESS
            </ul>
            <ul>
                <li>
                    {user === 'login' ? <a href="/login" target="_blank" rel="noopener noreferrer">login
                    </a>
                        : user}

                </li>
                <li>
                    <a href="/register" target="_blank" rel="noopener noreferrer">register
                    </a>
                </li>

            </ul>
        </nav>
    )
}
export default Navbar;