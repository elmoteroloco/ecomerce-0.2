import heroImage from "../assets/hero_001.2.png"

function Header() {
    return (
        <header
            style={{
                backgroundColor: "darkred",
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "10px",
                textAlign: "center",
                color: "orange"
            }}>
            <h1>Crisol</h1>
        </header>
    )
}

export default Header
