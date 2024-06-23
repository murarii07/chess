function Loading(props) {
    const daf = () => {
        let d = document.querySelector(".Loading");
        d.style.display = "none";
    }
    return (
        <>
            <div className="Loading">
                <h1>{props.message}</h1><br />
                <button onClick={() => daf()}>cancel</button>
            </div>
        </>
    )
}
export default Loading