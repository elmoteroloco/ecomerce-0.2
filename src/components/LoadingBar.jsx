import React from "react"

function LoadingBar() {
    const loadingBarAnimationName = "moveProgress"
    const highlightColor = "#FFA500"
    const barBackgroundColor = "#1A0000"

    const keyframesDefinition = `
        @keyframes ${loadingBarAnimationName} {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(400%);
            }
        }
    `

    const loadingBarContainerStyle = {
        width: "100%",
        height: "3px",
        backgroundColor: barBackgroundColor,
        position: "relative",
        overflow: "hidden",
        marginTop: "20px",
        marginBottom: "20px"
    }

    const progressIndicatorStyle = {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "25%",
        backgroundImage: `linear-gradient(to right,
            rgba(255, 165, 0, 0) 0%,
            ${highlightColor} 50%,
            rgba(255, 165, 0, 0) 100%
        )`,
        animation: `${loadingBarAnimationName} 1.2s linear infinite`
    }

    return (
        <>
            <style>{keyframesDefinition}</style>
            <div style={loadingBarContainerStyle}>
                <div style={progressIndicatorStyle}></div>
            </div>
        </>
    )
}

export default LoadingBar
