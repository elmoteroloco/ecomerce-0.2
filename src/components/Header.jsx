import heroImage from "../assets/hero_001.2.png"

function Header() {
    const h1Style = {
        fontSize: "4.5rem",
        color: "white",
        textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 15px #ff8c00, 0 0 20px #ff8c00",
        padding: "15px 0",
        margin: 0
    }

    return (
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
    )
}

export default Header
