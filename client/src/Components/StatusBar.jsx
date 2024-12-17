import { useEffect, useMemo, useRef, useState } from "react";
import Workload1 from "./workload";
import { useSelector, useDispatch } from "react-redux";
import { stateChange } from "../redux/flagSlice";
import { StatusBoard } from "./StatusBoard";
import Example from "./Tabs";
function Status() {
    //using redux
    const listContent = useMemo(() => ({
        "New": <Workload1 />,
        "Stat": <StatusBoard />,
    }), [])
    return (
        <div className="m-0  md:w-2/4 w-full">
           
            <Example component={listContent} />

        </div>
    )
}
export default Status