
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
                <Timer time={10} />
            </div>
            <div className='chessb'>
                <PlayRandomMoveEngine />
            </div>
            <div className="row" id='sender'>
                <div>
                    {/* <img src={logo}  /> */}
                    <span>{user}</span>
                </div>
                <Timer time={10} />
            </div>
        </div>
    );
}
export default Landing