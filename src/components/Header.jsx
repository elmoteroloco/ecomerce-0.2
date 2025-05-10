import heroImage from "../assets/hero_001.2.png"

function Header() {
    const pulseAnimationName = "h1PulseEffect"

    const h1Style = {
        fontSize: "12rem",
        color: "rgba(139, 0, 0, 0.25)",
        textShadow: "0 0 15px #A40000, 0 0 19px #A40000, 0 0 15px #370000, 0 0 19px #370000",
        margin: 0,
        letterSpacing: "18px",
        animationName: pulseAnimationName,
        animationDuration: "9s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        lineHeight: "1"
    }

    const keyframesDefinition = `
        @keyframes ${pulseAnimationName} {
            0% {
                transform: scale(1)
            }
            50% {
                transform: scale(1.03)
            }
            100% {
                transform: scale(1)
            }
        }
    `

    return (
        <>
            <style>{keyframesDefinition}</style>
            <header
                style={{
                    backgroundColor: "darkred",
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "20px 10px",
                    textAlign: "center",
                    color: "orange"
                }}>
                <h1 style={h1Style}>Crisol</h1>
            </header>
        </>
    )
}

export default Header
