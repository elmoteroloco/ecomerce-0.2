# Plan de Acción Detallado: Proyecto E-commerce React (Crisol)

**Objetivo General:** Mejorar el carrusel de la página principal, integrar Bootstrap para un diseño moderno y responsivo, y mantener la estructura del código limpia y funcional, respetando las restricciones de hooks (solo `useState` y `useEffect`).

---

## Fase 0: Preparación e Instalación de Bootstrap

### Tarea 0.1: Instalación de Librerías
- **Descripción:** Añadir Bootstrap y React-Bootstrap como dependencias del proyecto.
- **Acción:**
    1. Abrir la terminal en el directorio raíz del proyecto (`e:/_React_JS/react_proyecto_cero/ecomerce-0.2/`).
    2. Ejecutar el comando: `npm install bootstrap react-bootstrap` (o `yarn add bootstrap react-bootstrap` si usas Yarn).
- **Verificación:**
    1. Confirmar que `bootstrap` y `react-bootstrap` aparecen en las `dependencies` del archivo `package.json`.
    2. No deben existir errores durante la instalación.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 0.2: Importación Global de CSS de Bootstrap
- **Descripción:** Asegurar que los estilos base de Bootstrap se carguen en toda la aplicación.
- **Archivo a Modificar:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/App.jsx` (o `src/index.js` si es tu punto de entrada principal donde se renderiza `<App />`).
- **Acción:**
    1. Abrir el archivo `App.jsx` (o `index.js`).
    2. Añadir la siguiente línea al inicio del archivo, preferiblemente antes de cualquier otra importación de estilos CSS personalizados (como `App.css`):
       ```javascript
       import 'bootstrap/dist/css/bootstrap.min.css';
       ```
- **Verificación:**
    1. Ejecutar la aplicación (`npm start` o `yarn start`).
    2. Observar si los estilos globales por defecto de Bootstrap (ej. tipografía, reseteo de márgenes) se aplican a los elementos HTML.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 0.3: Creación de Archivo CSS para Overrides de Bootstrap (Recomendado)
- **Descripción:** Preparar un lugar centralizado para personalizar o sobrescribir los estilos de Bootstrap sin modificar directamente los archivos de la librería.
- **Acción:**
    1. Crear un nuevo archivo: `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/custom-bootstrap.css`. Inicialmente puede estar vacío.
    2. Modificar `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/App.jsx` (o `src/index.js`):
       Añadir la importación de este nuevo archivo *después* de la importación de `bootstrap.min.css`:
       ```javascript
       import 'bootstrap/dist/css/bootstrap.min.css';
       import './custom-bootstrap.css'; // Tu archivo de overrides
       import "./App.css"; // Si App.css también tiene overrides o estilos globales
       ```
- **Propósito:** Este archivo (`custom-bootstrap.css`) se usará para definir estilos como la duración de la transición del carrusel y otras personalizaciones específicas del proyecto.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado


### Tarea 0.4: Creación y Mantenimiento de Historial de Progreso
- **Descripción:** Crear y mantener un archivo separado (`PROGRESS_LOG.md`) para registrar los objetivos alcanzados y los próximos pasos, facilitando el seguimiento cronológico y la reanudación del trabajo.
- **Acción:**
    1. Crear un archivo `PROGRESS_LOG.md` en el directorio raíz del proyecto (`e:/_React_JS/react_proyecto_cero/ecomerce-0.2/`).
    2. Definir una estructura simple para el log (ej. secciones para "Objetivos Alcanzados" con fechas y referencias a `Plan.md`, y "Próximos Pasos" con notas para retomar).
    3. **Rutina:** Actualizar `PROGRESS_LOG.md` al finalizar una tarea significativa del `Plan.md` y/o antes de realizar un commit importante o finalizar una sesión de trabajo. Indicar la tarea completada y la próxima tarea a abordar.
- **Verificación:**
    1. El archivo `PROGRESS_LOG.md` existe en el directorio raíz.
    2. Se actualiza regularmente y refleja el estado actual del progreso y los siguientes pasos de manera clara.
    3. Facilita la reanudación del trabajo después de pausas.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado


---

## Fase 1: Implementación del Carrusel con React-Bootstrap y Adiciones Menores

### Tarea 1.1: Implementar Carrusel "Vaivén" con React-Bootstrap en `Main.jsx`
- **Descripción:** Reemplazar el carrusel manual existente por el componente `<Carousel>` de React-Bootstrap, implementando la lógica de "vaivén", timing personalizado y respetando las restricciones de hooks.
- **Archivo Principal:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Main.jsx`

- **Sub-Tarea 1.1.1: Importaciones y Definición de Estados y Constantes**
    - **Acción:**
        1. Importar `Carousel` de `react-bootstrap`: `import { Carousel } from 'react-bootstrap';`
        2. Ajustar/definir estados necesarios:
           ```javascript
           const [activeIndex, setActiveIndex] = useState(0); // Para controlar el slide activo
           // const [isPausedByUser, setIsPausedByUser] = useState(false); // Ya existe
           const [slideDirection, setSlideDirection] = useState('forward'); // 'forward' o 'backward'
           ```
        3. Definir constantes para el timing del carrusel (ajustar valores según preferencia):
           ```javascript
           const CAROUSEL_TRANSITION_DURATION_SECONDS = 3; // Duración de la animación CSS (ej. 3s)
           const CAROUSEL_STATIONARY_TIME_SECONDS = 0.5;   // Tiempo que cada slide permanece visible antes de transicionar (ej. 0.5s)
           const AUTO_ADVANCE_TIMEOUT_MS = (CAROUSEL_TRANSITION_DURATION_SECONDS + CAROUSEL_STATIONARY_TIME_SECONDS) * 1000;
           const USER_INACTIVITY_RESUME_TIMEOUT_MS = 6000; // Tiempo para reanudar auto-play
           ```
        4. `carouselItems` y `numCarouselItems` ya existen y se mantienen.

- **Sub-Tarea 1.1.2: Estructura JSX del Carrusel con React-Bootstrap**
    - **Acción:**
        1. Eliminar la estructura JSX del carrusel manual (el `div` con `carouselTrackStyle`, los botones `prevButtonStyle`/`nextButtonStyle` manuales, y el mapeo de `carouselItems` a `divs`).
        2. Implementar el componente `<Carousel>` de React-Bootstrap:
           ```jsx
            <Carousel
                activeIndex={activeIndex}
                onSelect={(selectedIndex, event) => {
                    // Esta función se llama cuando el usuario interactúa con los controles/indicadores de Bootstrap
                    // o cuando el intervalo interno (si estuviera activo) cambia el slide.
                    // Como controlamos el activeIndex externamente y el intervalo es null,
                    // la usaremos principalmente para detectar interacción del usuario.
                    if (event) { // event existe si la selección fue por interacción del usuario
                        handleUserInteraction(); // Pausa el carrusel
                        setActiveIndex(selectedIndex);
                    }
                }}
                interval={null} // Desactiva el avance automático interno de Bootstrap
                controls={true} // Muestra los botones de prev/next de Bootstrap
                indicators={true} // Muestra los indicadores de slide de Bootstrap
                pause={false} // Desactiva la pausa al hacer hover, ya que manejamos la pausa manualmente
                className="custom-main-carousel" // Clase para aplicar estilos de transición personalizados
                // touch={true} // Habilitar swipe en móviles (Bootstrap lo hace por defecto)
            >
                {carouselItems.map((item) => (
                    <Carousel.Item key={item.id}>
                        {/* Mantener o adaptar el contenido del slide actual */}
                        <div style={carouselItemContentStyle}> {/* Reutilizar o adaptar este estilo */}
                            <span style={carouselItemImagePlaceholderStyle}>
                                {item.imagePlaceholder}
                            </span>
                            <h3 style={{ fontSize: "1.7rem", marginBottom: "10px", fontWeight: 600, color: themeColorsMonochromaticDark.textPrimary }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: "1rem", color: themeColorsMonochromaticDark.textPrimary }}>
                                {item.description}
                            </p>
                        </div>
                        {/* Opcional: Usar Carousel.Caption para texto superpuesto si se prefiere */}
                        {/* <Carousel.Caption>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                ))}
            </Carousel>
           ```
        3. Los botones de navegación personalizados (`handlePrev`, `handleNext`) pueden eliminarse si se usan los controles de Bootstrap. Si se quieren mantener botones personalizados *además* o *en lugar* de los de Bootstrap, se deben adaptar para llamar a `handleUserInteraction()` y `setActiveIndex()`. Por simplicidad, comenzaremos usando los controles de Bootstrap.

- **Sub-Tarea 1.1.3: Lógica de Avance Automático y "Vaivén" (`useEffect`)**
    - **Acción:** Implementar un `useEffect` para gestionar el avance automático y la lógica de "vaivén".
      ```javascript
      useEffect(() => {
          if (isPausedByUser || numCarouselItems <= 1) {
              return; // No avanzar si está pausado o no hay suficientes items
          }

          const advanceLogic = () => {
              if (slideDirection === 'forward') {
                  if (activeIndex < numCarouselItems - 1) {
                      setActiveIndex(prev => prev + 1);
                  } else { // Llegó al final, invertir dirección
                      setSlideDirection('backward');
                      // Esperar la duración de la transición antes de moverse realmente
                      // para que el último slide se vea completamente antes de invertir.
                      // Esto se maneja con el timeout general.
                      setActiveIndex(prev => prev - 1);
                  }
              } else { // slideDirection === 'backward'
                  if (activeIndex > 0) {
                      setActiveIndex(prev => prev - 1);
                  } else { // Llegó al principio, invertir dirección
                      setSlideDirection('forward');
                      setActiveIndex(prev => prev + 1);
                  }
              }
          };

          const timerId = setTimeout(advanceLogic, AUTO_ADVANCE_TIMEOUT_MS);

          return () => {
              clearTimeout(timerId);
          };
      }, [activeIndex, slideDirection, isPausedByUser, numCarouselItems, AUTO_ADVANCE_TIMEOUT_MS, setActiveIndex, setSlideDirection]); // Incluir setters si el linter lo exige, aunque son estables.
      ```

- **Sub-Tarea 1.1.4: Manejo de Interacción del Usuario y Reanudación**
    - **Acción:**
        1. Modificar/Crear la función `handleUserInteraction`:
           ```javascript
           const handleUserInteraction = () => {
               setIsPausedByUser(true);
           };
           ```
        2. El `useEffect` para reanudar el carrusel tras inactividad (ya existente) se mantiene:
           ```javascript
            useEffect(() => {
                let inactivityTimerId;
                if (isPausedByUser) {
                    inactivityTimerId = setTimeout(() => {
                        setIsPausedByUser(false);
                    }, USER_INACTIVITY_RESUME_TIMEOUT_MS);
                }
                return () => {
                    clearTimeout(inactivityTimerId);
                };
            }, [isPausedByUser, USER_INACTIVITY_RESUME_TIMEOUT_MS]);
           ```

- **Sub-Tarea 1.1.5: Ajustar Duración de Transición del Carrusel (CSS)**
    - **Archivo:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/custom-bootstrap.css`
    - **Acción:** Añadir las siguientes reglas CSS para sobrescribir la duración de la transición por defecto de Bootstrap:
      ```css
      /* En custom-bootstrap.css */
      .custom-main-carousel .carousel-item {
          /* Usar el valor de CAROUSEL_TRANSITION_DURATION_SECONDS */
          transition: transform 3s ease-in-out !important; /* Ejemplo: 3 segundos */
          /* Bootstrap por defecto usa 'transform 0.6s ease-in-out' */
      }

      /* Opcional: Asegurar que los items adyacentes (next/prev) estén listos para la transición.
         Bootstrap suele manejar esto bien, pero si hay parpadeos, esto puede ayudar. */
      .custom-main-carousel .carousel-item-next,
      .custom-main-carousel .carousel-item-prev,
      .custom-main-carousel .carousel-item.active {
          display: block;
      }
      ```
    - **Nota:** El `!important` puede ser necesario para asegurar que se sobrescriba el estilo de Bootstrap debido a su especificidad. Usar con precaución.

- **Verificación Tarea 1.1:**
    1. El carrusel se muestra utilizando el componente de React-Bootstrap.
    2. El avance automático sigue la lógica de "vaivén": 0 → 1 → 2 → 3 → 2 → 1 → 0 → 1...
    3. La transición entre diapositivas dura el tiempo especificado en `CAROUSEL_TRANSITION_DURATION_SECONDS` (visible en el CSS).
    4. Cada diapositiva permanece visible el tiempo adicional de `CAROUSEL_STATIONARY_TIME_SECONDS` antes de que comience la siguiente transición.
    5. Al hacer clic en los controles de Bootstrap (flechas, indicadores), el carrusel se pausa.
    6. El carrusel se reanuda automáticamente después de `USER_INACTIVITY_RESUME_TIMEOUT_MS`.
- **Estado Tarea 1.1:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 1.2: Añadir Disclaimer al `Footer.jsx`
- **Descripción:** Incluir un texto legal/informativo en el pie de página.
- **Archivo:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Footer.jsx`
- **Acción:** Modificar el componente `Footer.jsx` para añadir el párrafo del disclaimer:
  ```diff
  --- a/e/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Footer.jsx
  +++ b/e/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Footer.jsx
  @@ -9,6 +9,9 @@
                 color: "black"
             }}>
             <p>&copy; 2025 - Mi Aplicación React</p>
  +            <p style={{ fontSize: '0.8rem', marginTop: '10px', color: 'lightgrey' }}>
  +                Este sitio web es un proyecto personal desarrollado con fines educativos y de demostración. No representa una entidad comercial real ni ofrece productos/servicios para la venta.
  +            </p>
         </footer>
     )
  }

Verificación: El texto del disclaimer es visible en el pie de página de la aplicación.
Estado: [ ] Pendiente [ ] En Progreso [ ] Completado
Tarea 1.3: Pruebas y Verificación (Fase 1)
Descripción: Probar integralmente los cambios realizados en la Fase 1.
Acciones:
Probar exhaustivamente el carrusel en la página de inicio:
Correcto funcionamiento del "vaivén" automático.
Precisión del timing (duración de transición y pausa).
Funcionalidad de la pausa por interacción del usuario (clic en controles/indicadores).
Correcta reanudación automática después del tiempo de inactividad.
Comportamiento si carouselItems tiene 0 o 1 elemento (debería ser estático o no mostrarse de forma problemática).
Verificar que el disclaimer se muestre correctamente en el Footer en todas las páginas.
Realizar pruebas en diferentes navegadores (Chrome, Firefox, Edge si es posible) para asegurar compatibilidad.
Revisar la consola del navegador en busca de errores o advertencias.
Estado: [ ] Pendiente [ ] En Progreso [ ] Completado
Tarea 1.4: Commit y Deploy (Fase 1)
Descripción: Guardar los cambios en el control de versiones y desplegarlos.
Acción:
Realizar un commit de los cambios de la Fase 1:
bash
git add .
git commit -m "Implementar carrusel vaivén con React-Bootstrap y añadir disclaimer"
Realizar un deploy a GitHub Pages (o tu plataforma de despliegue):
bash
npm run deploy # O el comando que uses para gh-pages
Verificación:
El commit se registra correctamente en el historial de Git.
El despliegue se completa sin errores.
Los cambios (carrusel funcional, disclaimer) se reflejan correctamente en la URL de producción/despliegue.
Estado: [ ] Pendiente [ ] En Progreso [ ] Completado
Fase 2: Refactorización del Resto de la Aplicación con Bootstrap
Objetivo: Modernizar la interfaz y mejorar la responsividad aplicando componentes y clases de utilidad de Bootstrap/React-Bootstrap al resto de la aplicación.

Tarea 2.1: Refactorizar Nav.jsx
Descripción: Reemplazar la barra de navegación manual con el componente <Navbar> de React-Bootstrap.
Archivo: e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Nav.jsx
Acción:
Importar los componentes necesarios: import { Navbar, Nav as BootstrapNav, Container, Badge } from 'react-bootstrap'; (usar alias BootstrapNav para evitar colisión con el nombre del componente Nav).
Reestructurar el JSX usando <Navbar>, <Container>, <Navbar.Brand>, <Navbar.Toggle>, <Navbar.Collapse>, <BootstrapNav>, y <BootstrapNav.Link as={Link} ...>.
Utilizar props de React-Bootstrap (bg, variant, expand="lg", collapseOnSelect) para el estilo y comportamiento. El uso de expand="lg" (o md, sm) junto con <Navbar.Toggle> y <Navbar.Collapse> proporcionará la funcionalidad responsiva básica (menú que se colapsa en un "hamburguesa" en pantallas más pequeñas que el punto de expansión).
Eliminar los estilos CSS-in-JS que sean reemplazados por Bootstrap.
Añadir un contador de ítems al enlace del carrito usando <Badge bg="secondary"> de Bootstrap.
- **Verificación:** El texto del disclaimer es visible en el pie de página de la aplicación.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 1.3: Pruebas y Verificación (Fase 1)
- **Descripción:** Probar integralmente los cambios realizados en la Fase 1.
- **Acciones:**
    1. Probar exhaustivamente el carrusel en la página de inicio:
        - Correcto funcionamiento del "vaivén" automático.
        - Precisión del timing (duración de transición y pausa).
        - Funcionalidad de la pausa por interacción del usuario (clic en controles/indicadores).
        - Correcta reanudación automática después del tiempo de inactividad.
        - Comportamiento si `carouselItems` tiene 0 o 1 elemento (debería ser estático o no mostrarse de forma problemática).
    2. Verificar que el disclaimer se muestre correctamente en el `Footer` en todas las páginas.
    3. Realizar pruebas en diferentes navegadores (Chrome, Firefox, Edge si es posible) para asegurar compatibilidad.
    4. Revisar la consola del navegador en busca de errores o advertencias.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 1.4: Commit y Deploy (Fase 1)
- **Descripción:** Guardar los cambios en el control de versiones y desplegarlos.
- **Acción:**
    1. Realizar un commit de los cambios de la Fase 1:
       ```bash
       git add .
       git commit -m "Implementar carrusel vaivén con React-Bootstrap y añadir disclaimer"
       ```
    2. Realizar un deploy a GitHub Pages (o tu plataforma de despliegue):
       ```bash
       npm run deploy # O el comando que uses para gh-pages
       ```
- **Verificación:**
    1. El commit se registra correctamente en el historial de Git.
    2. El despliegue se completa sin errores.
    3. Los cambios (carrusel funcional, disclaimer) se reflejan correctamente en la URL de producción/despliegue.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

---

## Fase 2: Refactorización del Resto de la Aplicación con Bootstrap

**Objetivo:** Modernizar la interfaz y mejorar la responsividad aplicando componentes y clases de utilidad de Bootstrap/React-Bootstrap al resto de la aplicación.

### Tarea 2.1: Refactorizar `Nav.jsx`
- **Descripción:** Reemplazar la barra de navegación manual con el componente `<Navbar>` de React-Bootstrap.
- **Archivo:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Nav.jsx`
- **Acción:**
    1. Importar los componentes necesarios: `import { Navbar, Nav as BootstrapNav, Container, Badge } from 'react-bootstrap';` (usar alias `BootstrapNav` para evitar colisión con el nombre del componente `Nav`).
    2. Reestructurar el JSX usando `<Navbar>`, `<Container>`, `<Navbar.Brand>`, `<Navbar.Toggle>`, `<Navbar.Collapse>`, `<BootstrapNav>`, y `<BootstrapNav.Link as={Link} ...>`.
    3. Utilizar props de React-Bootstrap (`bg`, `variant`, `expand="lg"`, `collapseOnSelect`) para el estilo y comportamiento. El uso de `expand="lg"` (o `md`, `sm`) junto con `<Navbar.Toggle>` y `<Navbar.Collapse>` proporcionará la funcionalidad responsiva básica (menú que se colapsa en un "hamburguesa" en pantallas más pequeñas que el punto de expansión).
    4. Eliminar los estilos CSS-in-JS que sean reemplazados por Bootstrap.
    5. Añadir un contador de ítems al enlace del carrito usando `<Badge bg="secondary">` de Bootstrap.
- **Verificación:**
    1. La barra de navegación es funcional y visualmente similar (o mejorada) a la anterior.
    2. Es responsiva: los ítems de navegación se colapsan detrás de un botón "hamburguesa" (toggle) en pantallas pequeñas (según el punto de `expand` definido).
    3. Los enlaces dirigen a las rutas correctas.
    4. El contador del carrito se actualiza correctamente.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 2.2: Refactorizar `Card.jsx` (para productos)
- **Descripción:** Utilizar el componente `<Card>` de React-Bootstrap para mostrar la información de cada producto.
- **Archivo:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/Card.jsx`
- **Acción:**
    1. Importar: `import { Card as BootstrapCard, Button } from 'react-bootstrap';` (alias `BootstrapCard`).
    2. Reemplazar el `div.producto-card` con `<BootstrapCard>`.
    3. Usar sub-componentes como `<BootstrapCard.Img>`, `<BootstrapCard.Body>`, `<BootstrapCard.Title>`, `<BootstrapCard.Text>`.
    4. Reemplazar los botones manuales por `<Button>` de React-Bootstrap, aplicando `variant` y `size` apropiados.
    5. Eliminar estilos del archivo `src/styles/Productos.css` que sean cubiertos por Bootstrap.
    6. Ajustar clases CSS o usar utilidades de Bootstrap (ej. `mt-2`, `d-flex`, `align-items-center`) para el espaciado y alineación de los controles de cantidad.
- **Verificación:**
    1. Las tarjetas de producto se muestran correctamente con el estilo de Bootstrap.
    2. La funcionalidad (agregar al carrito, sumar/restar cantidad) se mantiene.
    3. La animación de aparición (`isVisible`) sigue funcionando si se mantiene la lógica.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 2.3: Refactorizar `ProductosContainer.jsx` (Layout de Productos)
- **Descripción:** Utilizar el sistema de Grid de React-Bootstrap para organizar las tarjetas de producto.
- **Archivo:** `e:/_React_JS/react_proyecto_cero/ecomerce-0.2/src/components/ProductosContainer.jsx`
- **Acción:**
    1. Importar: `import { Container, Row, Col } from 'react-bootstrap';`
    2. Envolver el mapeo de `<Card>` con `<Container>` y `<Row>`.
    3. Cada `<Card>` debe estar dentro de un componente `<Col>` con props para responsividad (ej. `xs={12} sm={6} md={4} lg={3}`).
    4. Aplicar clases de utilidad de Bootstrap a `<Container>` o `<Row>` para espaciado (ej. `py-3`, `g-4` para gutters).
    5. Ajustar o eliminar la clase `productos-conteiner` de `src/styles/Productos.css` si el Grid de Bootstrap maneja el layout.
- **Verificación:**
    1. El listado de productos se muestra en un layout de rejilla responsivo.
    2. El espaciado entre tarjetas es adecuado.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 2.4: Revisar y Refactorizar Otros Componentes (Iterativo)
- **Descripción:** Aplicar Bootstrap/React-Bootstrap a otros componentes de la aplicación de forma progresiva.
- **Componentes y Acciones Sugeridas:**
    - **`Header.jsx`**:
        - Aunque tiene un estilo muy personalizado, se puede usar `<Container>` de Bootstrap para centrar el `<h1>` si es necesario.
        - Las animaciones CSS-in-JS (`pulseAnimationName`) probablemente se mantendrán.
    - **`Carrito.jsx` y `CarritoCard.jsx`**:
        - **`Carrito.jsx`**: Usar `<Container>`, `<Row>`, `<Col>` para la estructura de títulos y el total. Considerar `<Table responsive>` de React-Bootstrap para mostrar los ítems del carrito si la estructura es tabular.
        - **`CarritoCard.jsx`**: Si no se usa `<Table>`, cada ítem puede ser una `<Row>` con `<Col>` para alinear sus elementos. Los botones pueden ser `<Button variant="danger" size="sm">`. Eliminar estilos de `src/styles/Carrito.css` redundantes.
    - **`About.jsx`**, **`Contacto.jsx`**:
        - Usar `<Container>` para envolver el contenido principal y proporcionar márgenes consistentes.
        - En `Contacto.jsx`, si hay un formulario, refactorizarlo usando componentes de formulario de React-Bootstrap (`<Form>`, `<Form.Group>`, `<Form.Control>`, `<Form.Label>`, `<Button type="submit">`).
    - **Secciones de `Main.jsx` (Hero, Features, Final CTA)**:
        - Usar `<Container>` para centrar el contenido de cada sección.
        - Para `featuresGridStyle`, usar `<Row>` y `<Col>` (ej. `<Col md={4}>` para tres columnas en `md` y superior).
        - Reemplazar botones manuales con `<Button>` de React-Bootstrap, aplicando `variant`, `size`.
        - Evaluar si los estilos CSS-in-JS (ej. `sectionBaseStyle`, `h1Style`, `pStyle`) pueden simplificarse con clases de utilidad de Bootstrap (ej. `text-center`, `my-4`, `p-5`, `display-4`, `lead`).
- **Proceso General para cada Componente:**
    1. Identificar elementos HTML/JSX que tienen equivalentes en React-Bootstrap.
    2. Reemplazarlos progresivamente.
    3. Aplicar clases de utilidad de Bootstrap para estilos comunes (espaciado, colores, tipografía, alineación, flexbox, etc.).
    4. Eliminar estilos CSS-in-JS o de archivos CSS dedicados que se vuelvan redundantes.
    5. Conservar o mover a `custom-bootstrap.css` los estilos personalizados que sean necesarios para la identidad de la marca o funcionalidades no cubiertas por Bootstrap.
    6. Probar la funcionalidad y la responsividad después de cada refactorización significativa.
- **Commits:** Realizar commits frecuentes después de refactorizar cada componente o un grupo lógico de ellos.
    - *Ejemplo de mensaje:* `git commit -m "Aplicar React-Bootstrap a la vista de Carrito"`
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado (para cada sub-componente/sección)

### Tarea 2.5: Manejo de Estilos CSS-in-JS y Animaciones Existentes
- **Descripción:** Decidir la estrategia final para los estilos CSS-in-JS y las animaciones `@keyframes` que no fueron reemplazados por Bootstrap.
- **Acción:**
    1. Revisar todos los estilos CSS-in-JS restantes (ej. en `Header.jsx`, `LoadingBar.jsx`, `Main.jsx` para secciones).
    2. Revisar las definiciones de `@keyframes` (ej. `fadeInUpEffect`, `h1PulseEffect`, `moveProgress`).
    3. **Decisiones Estratégicas:**
        - **Mantener como CSS-in-JS:** Si el estilo es altamente dinámico (depende directamente de props/estado del componente) o es muy específico y aislado.
        - **Mover a `custom-bootstrap.css`:** Para estilos estáticos, overrides de Bootstrap, o estilos que se aplican a clases que ahora son parte de la estructura de Bootstrap.
        - **Mover a archivos CSS dedicados por componente:** Si un componente tiene muchos estilos personalizados que no son CSS-in-JS, puede tener su propio archivo CSS (ej. `Header.css`) importado en el componente.
        - **Animaciones `@keyframes`:**
            - Pueden permanecer como cadenas inyectadas con `<style>` si son pocas y muy específicas del componente.
            - Para una mejor organización y evitar la inyección de etiquetas `<style>` repetitivas, considerar moverlas a un archivo CSS global (ej. `animations.css` importado en `App.jsx`) o a `custom-bootstrap.css`.
- **Verificación:**
    1. La aplicación mantiene su identidad visual y las animaciones funcionan correctamente.
    2. El código de estilos está organizado de manera lógica y mantenible.
    3. Se ha minimizado la redundancia de estilos.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 2.6: Deploys Incrementales (Fase 2)
- **Descripción:** Desplegar los cambios a medida que se completan partes significativas de la refactorización.
- **Acción:** Realizar deploys a GitHub Pages (o tu plataforma) después de refactorizar hitos importantes (ej. todas las tarjetas de producto, la vista del carrito, la página de inicio completa).
- **Propósito:** Permitir la revisión continua en el entorno desplegado y detectar problemas de integración tempranamente.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado (para cada deploy incremental)

---

## Fase 3: Revisión Final y Limpieza

### Tarea 3.1: Revisión de Consistencia Visual y Funcional
- **Descripción:** Realizar una revisión completa de la aplicación para asegurar la coherencia y el correcto funcionamiento.
- **Acción:**
    1. Navegar por todas las páginas y secciones de la aplicación.
    2. Verificar la consistencia en espaciado, tipografía, uso de colores, y estilo de los componentes Bootstrap.
    3. Probar todas las funcionalidades clave (navegación, carrusel, compra, carrito, formularios) en diferentes flujos de usuario.
    4. Evaluar la responsividad en varios tamaños de pantalla (móvil, tablet, escritorio).
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 3.2: Limpieza de Código
- **Descripción:** Eliminar código no utilizado o redundante.
- **Acción:**
    1. Buscar y eliminar cualquier estilo CSS, clases CSS, o estilos CSS-in-JS que hayan quedado obsoletos tras la integración completa de Bootstrap.
    2. Remover `console.log()` utilizados para depuración.
    3. Eliminar comentarios innecesarios o código comentado que no se vaya a reutilizar.
    4. Utilizar herramientas de linting (como ESLint) para identificar y corregir importaciones no utilizadas u otros problemas menores de código.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 3.3: Pruebas Finales
- **Descripción:** Realizar una última ronda de pruebas exhaustivas antes de considerar la tarea completada.
- **Acción:**
    1. Repetir pruebas funcionales clave.
    2. Probar en los principales navegadores (Chrome, Firefox, Safari/Edge si es posible).
    3. Revisar la consola del navegador en busca de errores o advertencias en todas las páginas.
    4. (Opcional) Realizar pruebas de rendimiento básicas (ej. Lighthouse en Chrome DevTools) para identificar cuellos de botella obvios.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

### Tarea 3.4: Commit y Deploy Final
- **Descripción:** Guardar la versión final y estable en el control de versiones y desplegarla.
- **Acción:**
    1. Realizar el commit final de la fase de refactorización y limpieza:
       ```bash
       git add .
       git commit -m "Revisión final y limpieza post-integración de Bootstrap"
       ```
    2. Realizar el deploy final a la plataforma de producción/despliegue.
- **Verificación:**
    1. El commit se registra correctamente.
    2. El despliegue se completa sin errores.
    3. La versión desplegada es la versión estable y completa de la aplicación con todas las mejoras implementadas.
- **Estado:** [ ] Pendiente [ ] En Progreso [ ] Completado

---

**Consideraciones Continuas:**
- **Restricción de Hooks:** Siempre tener presente la restricción de no usar `useCallback`. Para funciones que deben pasarse como dependencias a `useEffect` o como props, y que se recrean en cada render, la estrategia principal es definir su lógica directamente dentro del `useEffect` si es posible, o ser extremadamente cuidadoso con los arrays de dependencias si la función se define fuera del `useEffect`. Las funciones *setter* de `useState` son estables y no causan problemas en los arrays de dependencias.
- **Especificidad CSS:** Al sobrescribir estilos de Bootstrap en `custom-bootstrap.css`, puede ser necesario usar selectores más específicos o, como último recurso y con moderación, `!important`.
- **Accesibilidad (A11y):** Durante la refactorización con React-Bootstrap, aprovechar las props relacionadas con ARIA que los componentes de Bootstrap suelen gestionar bien (ej. `aria-controls` en `Navbar.Toggle`, roles implícitos en componentes). Asegurar que los elementos interactivos sean accesibles mediante teclado.
- **Performance:** Aunque Bootstrap es eficiente, añadir cualquier librería incrementa el tamaño del bundle. Ser consciente de esto, aunque para un proyecto de aprendizaje suele ser aceptable.
- **Formato de Títulos de Commit:** Los títulos de los commits se realizarán sin prefijos convencionales (como "feat:", "refactor:", "chore:", etc.). Serán comentarios descriptivos en lenguaje plano sobre el cambio realizado. (Ej: `git commit -m "Implementar carrusel vaivén con React-Bootstrap y añadir disclaimer"`)
- **Menú Hamburguesa (Nav.jsx):** La implementación de un menú "hamburguesa" específico o altamente personalizado para la barra de navegación (`Nav.jsx`) se realizará en una fase posterior. La refactorización actual de `Nav.jsx` (Tarea 2.1) utilizará los componentes responsivos de React-Bootstrap (`<Navbar expand="lg">`, `<Navbar.Toggle>`, `<Navbar.Collapse>`), que proporcionan una funcionalidad de menú colapsable por defecto. Esta base permitirá una futura personalización o reemplazo si es necesario, sin impedir el progreso actual.
