import React, { useState, useEffect } from "react"

function Main() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPausedByUser, setIsPausedByUser] = useState(false)

    const carouselItems = [
        {
            id: 1,
            title: "Tecnología Innovadora",
            imagePlaceholder: "💻",
            description: "Gadgets y accesorios que marcan la diferencia."
        },
        {
            id: 2,
            title: "Experiencias Gourmet",
            imagePlaceholder: "🍷",
            description: "Delicias selectas para paladares exigentes."
        },
        {
            id: 3,
            title: "Escritorio y Oficina Premium",
            imagePlaceholder: "✒️",
            description: "Elegancia y funcionalidad para el día a día."
        },
        {
            id: 4,
            title: "Bienestar y Relax",
            imagePlaceholder: "🌿",
            description: "Regalos que inspiran calma y cuidado personal."
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
    `

    const themeColorsMonochromaticDark = {
        mainBackground: "rgba(26, 0, 0, 0.6)",
        cardBackground: "rgba(47, 0, 0, 0.6)",
        sectionAltBackground: "rgba(40, 0, 0, 0.6)",
        brandPrimaryBackground: "rgba(139, 0, 0, 0.6)",
        navButtonBackground: "rgba(70, 0, 0, 0.6)",
        textPrimary: "#EAEAEA",
        textSecondary: "#BDBDBD",
        textOnBrightAccent: "#1A0000",
        accentPrimary: "#FFA500",
        accentSecondary: "#A40000"
    }

    const mainStyle = {
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: themeColorsMonochromaticDark.textPrimary,
        lineHeight: 1.7,
        backgroundColor: themeColorsMonochromaticDark.mainBackground
    }

    const sectionBaseStyle = {
        padding: "50px 25px",
        textAlign: "center",
        opacity: 0,
        animation: `${fadeInUpAnimationName} 0.7s ease-out forwards`
    }

    const heroSectionStyle = {
        ...sectionBaseStyle,
        backgroundColor: themeColorsMonochromaticDark.mainBackground,
        paddingTop: "60px",
        paddingBottom: "60px"
    }

    const featuresSectionStyle = {
        ...sectionBaseStyle,
        backgroundColor: themeColorsMonochromaticDark.mainBackground,
        animationDelay: "0.2s"
    }

    const carouselSectionStyle = {
        ...sectionBaseStyle,
        backgroundColor: themeColorsMonochromaticDark.sectionAltBackground,
        animationDelay: "0.4s"
    }

    const finalCtaSectionStyle = {
        ...sectionBaseStyle,
        backgroundColor: themeColorsMonochromaticDark.brandPrimaryBackground,
        color: themeColorsMonochromaticDark.textPrimary,
        animationDelay: "0.6s"
    }

    const h1Style = {
        fontSize: "clamp(2.2rem, 5vw, 3rem)",
        color: themeColorsMonochromaticDark.accentPrimary,
        marginBottom: "20px",
        fontWeight: 700
    }

    const h2Style = {
        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
        color: themeColorsMonochromaticDark.accentPrimary,
        marginBottom: "40px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontWeight: 600
    }

    const pStyle = {
        fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
        maxWidth: "750px",
        margin: "0 auto 30px auto",
        color: themeColorsMonochromaticDark.textSecondary
    }

    const ctaButtonStyle = {
        display: "inline-block",
        backgroundColor: themeColorsMonochromaticDark.accentPrimary,
        color: themeColorsMonochromaticDark.textOnBrightAccent,
        padding: "14px 30px",
        border: "none",
        borderRadius: "6px",
        fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
        cursor: "pointer",
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        textDecoration: "none",
        transition: "background-color 0.3s ease, transform 0.2s ease"
    }

    const featuresGridStyle = {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px",
        marginTop: "20px"
    }

    const featureCardStyle = {
        backgroundColor: themeColorsMonochromaticDark.cardBackground,
        padding: "35px",
        borderRadius: "10px",
        border: `1px solid ${themeColorsMonochromaticDark.accentSecondary}`,
        width: "100%",
        maxWidth: "320px",
        textAlign: "center",
        transition: "transform 0.3s ease, border-color 0.3s ease"
    }

    const featureIconStyle = {
        fontSize: "3.5rem",
        color: themeColorsMonochromaticDark.accentPrimary,
        marginBottom: "20px",
        display: "block"
    }

    const featureCardTitleStyle = {
        fontSize: "1.6rem",
        color: themeColorsMonochromaticDark.accentSecondary,
        marginBottom: "15px",
        fontWeight: 600
    }

    const carouselContainerStyle = {
        position: "relative",
        maxWidth: "900px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "10px",
        border: `1px solid ${themeColorsMonochromaticDark.accentSecondary}`,
        cursor: "pointer"
    }

    const carouselTrackStyle = {
        display: "flex",
        transition: "transform 4s ease-in-out", // Cambiado a 4s
        transform: `translateX(-${currentSlide * 100}%)`
    }

    const carouselSlideStyle = {
        minWidth: "100%",
        boxSizing: "border-box",
        padding: "40px",
        textAlign: "center"
    }

    const carouselItemContentStyle = {
        backgroundColor: themeColorsMonochromaticDark.cardBackground,
        color: themeColorsMonochromaticDark.textPrimary,
        padding: "50px 30px",
        borderRadius: "8px",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const carouselItemImagePlaceholderStyle = {
        fontSize: "4rem",
        marginBottom: "15px",
        color: themeColorsMonochromaticDark.accentPrimary
    }

    const carouselNavButtonStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: themeColorsMonochromaticDark.navButtonBackground,
        color: themeColorsMonochromaticDark.textPrimary,
        border: `1px solid ${themeColorsMonochromaticDark.accentPrimary}`,
        padding: "12px",
        cursor: "pointer",
        fontSize: "1.8rem",
        zIndex: 2,
        borderRadius: "50%",
        width: "45px",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease, border-color 0.3s ease"
    }

    const prevButtonStyle = { ...carouselNavButtonStyle, left: "15px" }
    const nextButtonStyle = { ...carouselNavButtonStyle, right: "15px" }

    const handleUserInteraction = () => {
        setIsPausedByUser(true)
    }

    const handlePrev = () => {
        handleUserInteraction()
        setCurrentSlide((prev) => (prev === 0 ? numCarouselItems - 1 : prev - 1))
    }

    const handleNext = () => {
        handleUserInteraction()
        setCurrentSlide((prev) => (prev === numCarouselItems - 1 ? 0 : prev + 1))
    }

    const advanceSlide = () => {
        setCurrentSlide((prev) => (prev === numCarouselItems - 1 ? 0 : prev + 1))
    }

    useEffect(() => {
        let autoAdvanceTimerId
        if (!isPausedByUser) {
            autoAdvanceTimerId = setTimeout(() => {
                advanceSlide()
            }, 2000) // Cambiado a 2 segundos
        }
        return () => {
            clearTimeout(autoAdvanceTimerId)
        }
    }, [currentSlide, isPausedByUser, numCarouselItems])

    useEffect(() => {
        let inactivityTimerId
        if (isPausedByUser) {
            inactivityTimerId = setTimeout(() => {
                setIsPausedByUser(false)
            }, 6000)
        }
        return () => {
            clearTimeout(inactivityTimerId)
        }
    }, [isPausedByUser])

    const applyHover = (e, hoverStyle) => {
        Object.assign(e.currentTarget.style, hoverStyle)
    }
    const removeHover = (e, originalStyle) => {
        Object.assign(e.currentTarget.style, originalStyle)
    }

    const ctaButtonHover = {
        backgroundColor: themeColorsMonochromaticDark.accentSecondary,
        transform: "scale(1.03)"
    }
    const featureCardHover = {
        transform: "translateY(-8px)",
        borderColor: themeColorsMonochromaticDark.accentPrimary
    }
    const navButtonHover = {
        backgroundColor: "rgba(139, 0, 0, 0.7)",
        borderColor: themeColorsMonochromaticDark.accentPrimary
    }

    return (
        <>
            <style>{keyframesDefinition}</style>
            <main style={mainStyle}>
                <section style={heroSectionStyle}>
                    <h1 style={h1Style}>Regalos Corporativos que Inspiran Conexiones</h1>
                    <p style={pStyle}>
                        En Crisol, creamos obsequios empresariales únicos que reflejan la identidad
                        de tu marca y fortalecen relaciones valiosas. Calidad, personalización y
                        servicio excepcional.
                    </p>
                    <button
                        style={ctaButtonStyle}
                        onMouseOver={(e) => applyHover(e, ctaButtonHover)}
                        onMouseOut={(e) =>
                            removeHover(e, {
                                backgroundColor: themeColorsMonochromaticDark.accentPrimary,
                                transform: "scale(1)"
                            })
                        }>
                        Descubre Nuestras Colecciones
                    </button>
                </section>

                <section style={featuresSectionStyle}>
                    <h2 style={h2Style}>Nuestros Diferenciales</h2>
                    <div style={featuresGridStyle}>
                        <div
                            style={featureCardStyle}
                            onMouseOver={(e) => applyHover(e, featureCardHover)}
                            onMouseOut={(e) =>
                                removeHover(e, {
                                    transform: "translateY(0)",
                                    borderColor: themeColorsMonochromaticDark.accentSecondary
                                })
                            }>
                            <span style={featureIconStyle}>⭐</span>
                            <h3 style={featureCardTitleStyle}>Calidad Insuperable</h3>
                            <p style={{ color: themeColorsMonochromaticDark.textSecondary }}>
                                Productos seleccionados por su excelencia y diseño, garantizando una
                                impresión duradera.
                            </p>
                        </div>
                        <div
                            style={featureCardStyle}
                            onMouseOver={(e) => applyHover(e, featureCardHover)}
                            onMouseOut={(e) =>
                                removeHover(e, {
                                    transform: "translateY(0)",
                                    borderColor: themeColorsMonochromaticDark.accentSecondary
                                })
                            }>
                            <span style={featureIconStyle}>🎨</span>
                            <h3 style={featureCardTitleStyle}>Personalización Creativa</h3>
                            <p style={{ color: themeColorsMonochromaticDark.textSecondary }}>
                                Adaptamos cada detalle para que tu regalo sea tan único como tu
                                marca.
                            </p>
                        </div>
                        <div
                            style={featureCardStyle}
                            onMouseOver={(e) => applyHover(e, featureCardHover)}
                            onMouseOut={(e) =>
                                removeHover(e, {
                                    transform: "translateY(0)",
                                    borderColor: themeColorsMonochromaticDark.accentSecondary
                                })
                            }>
                            <span style={featureIconStyle}>🚚</span>
                            <h3 style={featureCardTitleStyle}>Logística Eficiente</h3>
                            <p style={{ color: themeColorsMonochromaticDark.textSecondary }}>
                                Desde la selección hasta la entrega, gestionamos todo el proceso con
                                precisión.
                            </p>
                        </div>
                    </div>
                </section>

                <section style={carouselSectionStyle}>
                    <h2 style={h2Style}>Categorías Populares</h2>
                    <div style={carouselContainerStyle} onClick={handleUserInteraction}>
                        <button
                            style={prevButtonStyle}
                            onClick={(e) => {
                                e.stopPropagation()
                                handlePrev()
                            }}
                            onMouseOver={(e) => applyHover(e, navButtonHover)}
                            onMouseOut={(e) =>
                                removeHover(e, {
                                    backgroundColor:
                                        themeColorsMonochromaticDark.navButtonBackground,
                                    borderColor: themeColorsMonochromaticDark.accentPrimary
                                })
                            }>
                            &#x276E;
                        </button>
                        <div style={{ overflow: "hidden" }}>
                            <div style={carouselTrackStyle}>
                                {carouselItems.map((item) => (
                                    <div key={item.id} style={carouselSlideStyle}>
                                        <div style={carouselItemContentStyle}>
                                            <span style={carouselItemImagePlaceholderStyle}>
                                                {item.imagePlaceholder}
                                            </span>
                                            <h3
                                                style={{
                                                    fontSize: "1.7rem",
                                                    marginBottom: "10px",
                                                    fontWeight: 600,
                                                    color: themeColorsMonochromaticDark.textPrimary
                                                }}>
                                                {item.title}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "1rem",
                                                    color: themeColorsMonochromaticDark.textPrimary
                                                }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            style={nextButtonStyle}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNext()
                            }}
                            onMouseOver={(e) => applyHover(e, navButtonHover)}
                            onMouseOut={(e) =>
                                removeHover(e, {
                                    backgroundColor:
                                        themeColorsMonochromaticDark.navButtonBackground,
                                    borderColor: themeColorsMonochromaticDark.accentPrimary
                                })
                            }>
                            &#x276F;
                        </button>
                    </div>
                </section>

                <section style={finalCtaSectionStyle}>
                    <h2 style={{ ...h2Style, color: themeColorsMonochromaticDark.textPrimary }}>
                        ¿Listo para Elevar tus Regalos Corporativos?
                    </h2>
                    <p
                        style={{
                            ...pStyle,
                            color: themeColorsMonochromaticDark.textSecondary,
                            marginBottom: "35px"
                        }}>
                        Hablemos de tus necesidades. Nuestro equipo está listo para asesorarte y
                        crear la solución perfecta que represente a tu empresa.
                    </p>
                    <button
                        style={{
                            ...ctaButtonStyle,
                            backgroundColor: themeColorsMonochromaticDark.accentPrimary,
                            color: themeColorsMonochromaticDark.textOnBrightAccent
                        }}
                        onMouseOver={(e) =>
                            applyHover(e, {
                                backgroundColor: themeColorsMonochromaticDark.accentSecondary,
                                color: themeColorsMonochromaticDark.textPrimary,
                                transform: "scale(1.03)"
                            })
                        }
                        onMouseOut={(e) =>
                            removeHover(e, {
                                backgroundColor: themeColorsMonochromaticDark.accentPrimary,
                                color: themeColorsMonochromaticDark.textOnBrightAccent,
                                transform: "scale(1)"
                            })
                        }>
                        Contactar Ahora
                    </button>
                </section>
            </main>
        </>
    )
}

export default Main
