import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
function Timer() {
    const time = useSelector(state => state.time.value)
    const flag = useSelector(state => state.f.value)
    const [timea, setTime] = useState(time - 1)
    const reff = useRef(null)
    const [seconds, setSec] = useState(59)
    const re = useRef(seconds)
    useEffect(() => {
        if (flag) {
            reff.current = setInterval(() => {
                if (re.current !== 0) {
                    re.current -= 1
                    setSec(s => s - 1)
                } else {
                    re.current=59
                    setTime(t => t - 1)
                    setSec(59)
                }
            }, 1000)
        }
        return () => {
            setTime(time-1)
            setSec(59)
            clearInterval(reff.current)
        }
    }, [flag])

    return (
        <div>
            {timea}:{seconds}
        </div>
    )
}
export default Timer