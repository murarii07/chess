
import Timer from './timer'
import { useSelector } from 'react-redux';
import PlayRandomMoveEngine from './chess';
function Landing() {
    const opponent=useSelector(st=>st.opponent.value)
    const user=useSelector(st=>st.user.value)
    return (
        <div className="chessboard">
            <div className="row" id="receiver">
                <div>
                    {/* <img src={logo}  /> */}
                    <span>{opponent}</span>
                </div>
                {/* <Timer  /> */}
            </div>
            <div className='chessb'>
                <PlayRandomMoveEngine />
            </div>
            <div className="row" id='sender'>
                <div>
                    {/* <img src={logo}  /> */}
                    <span>{user==="login"?Math.random(5).toString(16):user}</span>
                </div>
                <Timer  />
            </div>
        </div>
    );
}
export default Landing