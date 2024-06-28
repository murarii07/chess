function Loading() {
    const daf = () => {
        let d = document.querySelector(".Loading");
        d.style.display="none";
    }
    return (
        <>
            <div className="Loading">
                <h1>Searxching players</h1><br />
                <h1>...</h1>
                <button onClick={() => daf()}>cancel</button>
            </div>
        </>
    )
}
export default Loading