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
const CAROUSEL_AUTO_PLAY_INTERVAL = 3333
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

    const keyframesDefinition = `
        @keyframes h1PulseEffect {
            0% { transform: scale(1) }
            50% { transform: scale(1.03) }
            100% { transform: scale(1) }
        }
        @keyframes fadeInUpEffect {
            from { opacity: 0; transform: translateY(${FADE_IN_UP_INITIAL_TRANSLATE_Y}); }
            to { opacity: 1; transform: translateY(0); }
        }
        .carousel, .carousel-inner {
            height: 100% !important;
            background-color: transparent !important;
            overflow-x: hidden !important;
            max-width: 100vw !important;
        }
        .carousel-item {
            height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            position: relative !important;
        }
        .carousel-item img, .carousel-inner img {
            max-width: 100vw !important;
            width: 100%;
            height: auto;
            display: block;
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

    const h1Style = {
        fontSize: "clamp(2.5rem, 8vw, 7rem)",
        color: "rgba(139, 0, 0, 0.25)",
        textShadow: "0 0 15px #A40000, 0 0 19px #A40000, 0 0 15px #370000, 0 0 19px #370000",
        margin: 0,
        letterSpacing: "0.15em",
        animation: `h1PulseEffect ${H1_PULSE_ANIMATION_DURATION} infinite ease-in-out`,
        lineHeight: "1"
    }

    const carouselSectionStyle = {
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
        if (event) setIsPausedByUser(true)
        setActiveIndex(selectedIndex)
    }

    useEffect(() => {
        if (isPausedByUser || NUM_CAROUSEL_ITEMS <= 1) return
        const timer = setTimeout(() => {
            setActiveIndex(prevIndex => {
                let newIndex = prevIndex
                let newDirection = direction
                if (newDirection === 1) {
                    newIndex = prevIndex === NUM_CAROUSEL_ITEMS - 1 ? prevIndex - 1 : prevIndex + 1
                    if (prevIndex === NUM_CAROUSEL_ITEMS - 1) newDirection = -1
                } else {
                    newIndex = prevIndex === 0 ? prevIndex + 1 : prevIndex - 1
                    if (prevIndex === 0) newDirection = 1
                }
                if (direction !== newDirection) setDirection(newDirection)
                return Math.max(0, Math.min(newIndex, NUM_CAROUSEL_ITEMS - 1))
            })
        }, CAROUSEL_AUTO_PLAY_INTERVAL)
        return () => clearTimeout(timer)
    }, [activeIndex, direction, isPausedByUser])

    return (
        <>
            <style>{keyframesDefinition}</style>
            <div
                style={{
                    position: "fixed",
                    top: 65,
                    left: 0,
                    width: "100%",
                    zIndex: 1100,
                    backgroundColor: "var(--accent-secondary-color)",
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "var(--text-on-accent-color)",
                    textAlign: "center"
                }}>
                <h1 style={h1Style}>Crisol</h1>
            </div>
            <div
                style={{
                    marginTop: 120,
                    zIndex: 1,
                    position: "relative",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                    transition: "margin-top 0.8s cubic-bezier(0.4,0,0.2,1)"
                }}>
                <section style={carouselSectionStyle}>
                    {NUM_CAROUSEL_ITEMS > 0 && (
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null}
                            controls={false}
                            indicators={false}
                            pause={false}
                            fade={true}
                            className="h-100"
                        >
                            {CAROUSEL_ITEMS.map(item => (
                                <Carousel.Item key={item.id}>
                                    <img
                                        style={carouselImageStyle}
                                        className="d-block"
                                        src={item.imageUrl}
                                        alt={`Imagen de producto ${item.id}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </section>
            </div>
        </>
    )
}

export default Header
