import {useMemo } from "react";
import Workload1 from "./workload";

import { StatusBoard } from "./StatusBoard";
import Example from "./Tabs";
import { useSelector } from "react-redux";
function Status() {
    const f=useSelector(state=>state.f.value)
    //using redux
    const listContent = useMemo(() => ({
        "New": <Workload1 />,
        "Stat": <StatusBoard />,
    }), [])
    return (
        <div className="m-0  md:w-2/4 w-full">
           
            <Example component={listContent} index={f?1:0} />

        </div>
    )
}
export default Status