import React, { useState, useEffect } from "react"
import Carousel from "react-bootstrap/Carousel"

function Main() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPausedByUser, setIsPausedByUser] = useState(false)

    const carouselItems = [
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
    const numCarouselItems = carouselItems.length

    const fadeInUpAnimationName = "fadeInUpEffect"
    const keyframesDefinition = `
        @keyframes ${fadeInUpAnimationName} {
            from {
                opacity: 0;
                transform: translateY(25px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }


        .carousel-item {
            height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            }

        /* Styles to control the fade transition speed */
        .carousel-fade .carousel-item {
            transition-property: opacity;
            transform: none;
        }

        .carousel-fade .carousel-item.active,
        .carousel-fade .carousel-item-next.carousel-item-start,
        .carousel-fade .carousel-item-prev.carousel-item-end {
            transition-duration: 2.5s;
            opacity: 1;
        }

        .carousel-fade .carousel-item-next,
        .carousel-fade .carousel-item-prev,
        .carousel-fade .active.carousel-item-start,
        .carousel-fade .active.carousel-item-end {
            opacity: 0;
            transition-duration: 2.5s;
        }
        `

    const mainStyle = {
        fontFamily: "var(--font-family-base)",
        lineHeight: 1.7,
        backgroundColor: "var(--main-bg-color)",
        paddingTop: "0px",
        paddingBottom: "0px",
        minHeight: "calc(100vh - 140px)", // Asumiendo Navbar (60px) + Footer (80px)
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const carouselSectionStyle = {
        padding: "0 25px",
        textAlign: "center",
        opacity: 0,
        animation: `${fadeInUpAnimationName} 0.7s ease-out forwards`,
        height: "100%",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        animationDelay: "0.1s"
    }

    const carouselImageStyle = {
        height: "100%",
        objectFit: "contain",
        width: "auto",
        maxWidth: "100%"
    }

    const handleSelect = (selectedIndex, event) => {
        if (event) {
            setIsPausedByUser(true)
        }
        setActiveIndex(selectedIndex)
    }

    useEffect(() => {
        if (isPausedByUser || numCarouselItems <= 1) return

        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => {
                if (numCarouselItems <= 1) return prevIndex

                let newIndex = prevIndex
                let newDirection = direction

                if (newDirection === 1) {
                    if (prevIndex === numCarouselItems - 1) {
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
                    : newIndex >= numCarouselItems
                    ? numCarouselItems - 1
                    : newIndex
            })
        }, 50)

        return () => clearTimeout(timer)
    }, [activeIndex, direction, isPausedByUser, numCarouselItems])

    return (
        <>
            <style>{keyframesDefinition}</style>
            <main style={mainStyle}>
                <section style={carouselSectionStyle}>
                    {numCarouselItems > 0 && (
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null}
                            controls={false}
                            indicators={false}
                            pause={false}
                            fade={true}
                            className="h-100">
                            {carouselItems.map((item) => (
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
            </main>
        </>
    )
}

export default Main
