import heroImage from "../assets/hero_001.2.png"

function Header() {
    return (
        <header
            style={{
                backgroundColor: "#4CAF50",
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "10px",
                textAlign: "center",
                color: "white"
            }}>
            <h1>Bienvenidos a mi App React</h1>
        </header>
    )
}

export default Header
