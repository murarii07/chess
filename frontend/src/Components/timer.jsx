import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
function Timer(props) {
    const time = useSelector(state => state.time.value)
    const [timea, setTime] = useState(time)
    const [flag, setflag] = useState(false)
    const reff = useRef(null)
    const currentRef = useRef(Date.now())
    const re = useRef(null)
    useEffect(() => {
        if (flag) {
            reff.current = setInterval(() => {
                setTime(c => c + 1)
                //date.now give current time in milliseconds since 10s=10000ms
                re.current = Date.now() - currentRef.current;
                console.log(re.current)
                if (re.current > 10000) {
                    clearInterval(reff.current)
                }
            }, 1000)
        }
        return () => {
            clearInterval(reff.current)
        }
    }, [flag])
    const handleclick = () => {
        setflag(true)
        console.log(flag)
    }
    useEffect(() => {
        setTime(time)
    }, [time])
    return (
        <div onClick={handleclick}>
            {timea}:00
        </div>
    )
}
export default Timer