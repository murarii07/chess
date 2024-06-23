
import Timer from './timer'

import PlayRandomMoveEngine from './chess';
function Landing() {
    return (
        <div className="chessboard">
            <div className="row" id="receiver">
                <div>
                    {/* <img src={logo}  /> */}
                    <span> receiver</span>
                </div>
                <Timer time={10} />
            </div>
            <div className='chessb'>
                <PlayRandomMoveEngine />
            </div>
            <div className="row" id='sender'>
                <div>
                    {/* <img src={logo}  /> */}
                    <span>sender</span>
                </div>
                <Timer time={10} />
            </div>
        </div>
    );
}
export default Landing