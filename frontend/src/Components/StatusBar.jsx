import { useEffect, useMemo, useRef, useState } from "react";
import Workload1 from "./workload";
import Workload2 from "./Workload2";
import Workload3 from "./Workload3";
import { useSelector, useDispatch } from "react-redux";
import { stateChange } from "../redux/flagSlice";
import { Chessboard } from "react-chessboard";
function Status() {
    //using redux
    const nodea = useSelector(state => state.flag.value)
    const dispatch = useDispatch()
    //to return the object  from function we wrap in  '()'
    //     The useMemo hook in React is used to memoize values, preventing expensive calculations from being re-run on every render. It can help optimize performance, especially in components that perform intensive operations or have complex dependencies.

    //
    const listContent = useMemo(() => ({
        "New": <Workload1 />,
        "Stat": <Workload2 />,
        "Messages": <Workload3 />
    }), [])
    const list = Object.keys(listContent)
    console.log("ds")

    //performing event delegation.........
    const handleClick = (e) => {
        let targetedLi = e.target
        console.log(targetedLi.innerText)
        const s = listContent[targetedLi.innerText]
        console.log(s)
        dispatch(stateChange(targetedLi.innerText))
        let lis = document.querySelectorAll(".nav li")
        lis.forEach(element => {
            element.style = "background: none;"
        })
        e.target.style = "background: rgba(255, 228, 196, 0.089);"
    }
    useEffect(() => {

    }, [])
    return (
        <div className="Status">
            <div className="nav" onClick={handleClick}>
                {list.map(((x, index) => <li className={x} key={index} id={x}>{x}</li>))}
            </div>
            {listContent[nodea]}

        </div>
    )
}
export default Status