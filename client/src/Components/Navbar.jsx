import { useSelector } from "react-redux";
function Navbar() {
    const user = useSelector(st => st.user.value);
    return (
        <nav className="w-full h-1/6 mt-0 border-red-600 border-2 bg-red-600 rounded-md flex justify-between">
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