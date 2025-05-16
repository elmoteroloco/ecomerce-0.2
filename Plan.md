# Plan de Desarrollo del Proyecto E-commerce

## Fase Actual: Implementación de Autenticación y Rutas Protegidas

### 1. Sistema de Pseudo-Login (Autenticación)

- [ ] **Definición del Estado de Autenticación:**
    - [ ] Establecer cómo se almacenará el estado del usuario (ej. `null`, `{ rol: 'user' }`, `{ rol: 'admin' }`).
    - [ ] Considerar el uso de React Context API o un estado global (Zustand, Redux Toolkit) para gestionar la autenticación.
- [ ] **Componentes de UI para Login/Logout:**
    - [ ] Crear un componente o sección en el `Navbar` o una página dedicada para los botones de login/logout.
    - [ ] Implementar botón booleano "Admin: Login / Admin: Logout".
    - [ ] Implementar botón booleano "User: Login / User: Logout".
- [ ] **Lógica de Autenticación:**
    - [ ] Desarrollar funciones para simular el login y logout de administradores.
    - [ ] Desarrollar funciones para simular el login y logout de usuarios estándar.
    - [ ] Actualizar el estado global de autenticación al cambiar el estado de login.

### 2. Rutas Protegidas (Autorización)

- [ ] **Identificación de Rutas a Proteger:**
    - [ ] Listar las rutas que requerirán que el usuario sea administrador (ej. `/admin/dashboard`, `/admin/productos/crear`).
    - [ ] Listar las rutas que requerirán que el usuario esté logueado (ej. `/perfil`, `/mis-pedidos`).
- [ ] **Creación de Componentes de Ruta Protegida:**
    - [ ] Desarrollar un componente `AdminProtectedRoute` que verifique si el usuario es administrador.
        - [ ] Redirigir a una página de login o de "acceso denegado" si no es admin.
    - [ ] Desarrollar un componente `UserProtectedRoute` que verifique si el usuario está logueado (sea admin o user).
        - [ ] Redirigir a una página de login si no está logueado.
- [ ] **Configuración del Enrutador (`react-router-dom`):**
    - [ ] Integrar los componentes de ruta protegida en la configuración de rutas principal.
    - [ ] Definir rutas públicas, rutas protegidas para usuarios y rutas protegidas para administradores.

### 3. Mejoras y Consideraciones Adicionales

- [ ] **Feedback Visual:**
    - [ ] Mostrar mensajes o indicadores visuales del estado de login (ej. "Logueado como Admin").
- [ ] **Persistencia (Opcional para pseudo-login):**
    - [ ] Considerar si el estado de login debe persistir entre sesiones (ej. usando `localStorage`), aunque para un pseudo-login puede no ser estrictamente necesario.
- [ ] **Pruebas:**
    - [ ] Probar todos los flujos de login/logout para ambos roles.
    - [ ] Verificar que el acceso a las rutas protegidas funcione como se espera.
    - [ ] Probar los casos de redirección por acceso no autorizado.

---
