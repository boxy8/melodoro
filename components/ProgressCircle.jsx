function ProgressCircle(props) {
    const { text } = props;

    return (
        <>
            <div className="flex content-center font-bellota text-8xl m-8">
                <svg width="450" height="450">
                    <circle className="stroke-purple-dark" cx="225" cy="225" r="215" fill="transparent" strokeWidth="10" />
                    <text x="50%" y="50%" dominantBaseline="middle" text-anchor="middle">{text}</text>
                </svg>
            </div>
        </>
    );
}

export default ProgressCircle;