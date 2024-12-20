import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const user = useSelector(st => st.gameInfo.user);
    const navi=useNavigate()
    return (
        <div className="w-[95%] mx-auto h-1/6 mt-2 rounded-md flex  justify-between  items-center">
        <h1 className="text-3xl font-extrabold ">CHESS</h1>
            <ul className="" onClick={(e)=>{
                if(e.target){
                    navi("/"+e.target.innerText)
                }
            }}>

                <li className="text-white">
                    signin

                </li>
                <li className="text-white">
                    signup
                </li>

            </ul>
        </div>
    )
}
export default Navbar;