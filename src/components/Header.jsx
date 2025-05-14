import React, { useState, useEffect } from "react"
import heroImage from "../assets/hero_001.2.png"
import Carousel from "react-bootstrap/Carousel"

const CAROUSEL_ITEMS = [
    {
        id: 1,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1746741034/crisol-1-mamboreta_cxonrb.jpg"
    },
    {
        id: 2,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1746741033/crisol-2-ouroboros_jmtost.jpg"
    },
    {
        id: 3,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1746741034/crisol-3-cthulhu_wiwt7j.jpg"
    },
    {
        id: 4,
        imageUrl:
            "https://res.cloudinary.com/dy5u2krtv/image/upload/v1746741034/crisol-4-hamadrias_mp3kyk.jpg"
    }
]
const NUM_CAROUSEL_ITEMS = CAROUSEL_ITEMS.length
// Constantes para valores mágicos
const CAROUSEL_AUTO_PLAY_INTERVAL = 5000 // ms
const H1_PULSE_ANIMATION_DURATION = "9s"
const CAROUSEL_ITEM_FADE_DURATION = "2.5s"
const FADE_IN_UP_INITIAL_TRANSLATE_Y = "25px"
const CAROUSEL_SECTION_HEIGHT = "440px"
const CAROUSEL_SECTION_MAX_WIDTH = "1000px"
const CAROUSEL_SECTION_MARGIN_TOP = "-53px"

function Header() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPausedByUser, setIsPausedByUser] = useState(false)

    const pulseAnimationName = "h1PulseEffect"

    const h1Style = {
        fontSize: "7rem",
        color: "rgba(139, 0, 0, 0.25)",
        textShadow: "0 0 15px #A40000, 0 0 19px #A40000, 0 0 15px #370000, 0 0 19px #370000",
        margin: 0,
        //marginBottom: "15px",
        letterSpacing: "18px",
        animationName: pulseAnimationName,
        animationDuration: H1_PULSE_ANIMATION_DURATION,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        lineHeight: "1"
    }

    const fadeInUpAnimationName = "fadeInUpEffect"
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

        @keyframes ${fadeInUpAnimationName} {
            from {
                opacity: 0;
                transform: translateY(${FADE_IN_UP_INITIAL_TRANSLATE_Y});
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Estilos para el Carousel de Bootstrap adaptados */
        .carousel, .carousel-inner { /* Aseguramos que el .carousel y .carousel-inner también tomen el 100% de la altura */
            height: 100% !important;
            background-color: transparent !important; /* Hacemos el fondo del inner transparente también */
        }

        .carousel-item {
            height: 100% !important; /* Asegurar altura completa para el item */
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            position: relative !important;
        }

        .carousel-fade .carousel-item {
            transition-property: opacity;
            transform: none;
        }

        .carousel-fade .carousel-item.active,
        .carousel-fade .carousel-item-next.carousel-item-start,
        .carousel-fade .carousel-item-prev.carousel-item-end {
            transition-duration: ${CAROUSEL_ITEM_FADE_DURATION};
            opacity: 1;
        }

        .carousel-fade .carousel-item-next,
        .carousel-fade .carousel-item-prev,
        .carousel-fade .active.carousel-item-start,
        .carousel-fade .active.carousel-item-end {
            opacity: 0;
            transition-duration: ${CAROUSEL_ITEM_FADE_DURATION};
        }
        `

    const titleSectionStyle = {
        // Estilo para el contenedor principal del header
        backgroundColor: "var(--accent-secondary-color)",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "10px 0 20px",
        textAlign: "center",
        color: "var(--text-on-accent-color)",
        position: "relative",
        zIndex: 2
    }

    const carouselSectionStyle = {
        // Estilos para la sección del carrusel
        padding: "0 25px 10px",
        backgroundColor: "var(--carousel-bg-color)",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        marginTop: CAROUSEL_SECTION_MARGIN_TOP,
        height: CAROUSEL_SECTION_HEIGHT,
        width: "100%",
        maxWidth: CAROUSEL_SECTION_MAX_WIDTH,
        margin: "0 auto"
    }

    const carouselImageStyle = {
        display: "block",
        maxHeight: "100%",
        maxWidth: "100%",
        objectFit: "contain"
    }

    const handleSelect = (selectedIndex, event) => {
        if (event) {
            setIsPausedByUser(true)
        }
        setActiveIndex(selectedIndex)
    }

    useEffect(() => {
        if (isPausedByUser || NUM_CAROUSEL_ITEMS <= 1) return

        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => {
                if (NUM_CAROUSEL_ITEMS <= 1) return prevIndex

                let newIndex = prevIndex
                let newDirection = direction
                if (newDirection === 1) {
                    if (prevIndex === NUM_CAROUSEL_ITEMS - 1) {
                        newDirection = -1
                        newIndex = prevIndex - 1
                    } else {
                        newIndex = prevIndex + 1
                    }
                } else {
                    if (prevIndex === 0) {
                        newDirection = 1
                        newIndex = prevIndex + 1
                    } else {
                        newIndex = prevIndex - 1
                    }
                }

                if (direction !== newDirection) {
                    setDirection(newDirection)
                }
                return newIndex < 0
                    ? 0
                    : newIndex >= NUM_CAROUSEL_ITEMS
                    ? NUM_CAROUSEL_ITEMS - 1
                    : newIndex
            })
        }, CAROUSEL_AUTO_PLAY_INTERVAL)

        return () => clearTimeout(timer)
    }, [activeIndex, direction, isPausedByUser])
    return (
        <>
            <style>{keyframesDefinition}</style>
            <header style={{ textAlign: "center", position: "relative" }}>
                <div style={titleSectionStyle}>
                    <h1 style={h1Style}>Crisol</h1>
                </div>
                <section style={carouselSectionStyle}>
                    {NUM_CAROUSEL_ITEMS > 0 && (
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null} // Desactivar intervalo automático de Bootstrap, lo manejamos nosotros
                            controls={false} // Sin controles de prev/next
                            indicators={false} // Sin indicadores de slides
                            pause={false} // No pausar en hover (ya lo manejamos con isPausedByUser)
                            fade={true}
                            className="h-100" // Para que el Carousel ocupe la altura de carouselSectionStyle
                        >
                            {CAROUSEL_ITEMS.map((item) => (
                                <Carousel.Item key={item.id}>
                                    <img
                                        style={carouselImageStyle}
                                        className="d-block" // Bootstrap class para display block
                                        src={item.imageUrl}
                                        alt={`Imagen de producto ${item.id}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </section>
            </header>
        </>
    )
}

export default Header
