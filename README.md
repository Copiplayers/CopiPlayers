# 🏀 Proyecto Baloncesto — FP Dual
Aplicación full stack: **Angular 21** + **Spring Boot** + **H2**.
Gestión de equipos de baloncesto y sus jugadores (relación 1:M).
---
## Requisitos previos
- **Java 17** (JDK)
- **Maven 3.8+**
- **Node.js 18+** y **npm**
- **Angular CLI** (`npm install -g @angular/cli`)
---
## Arrancar el Backend
```bash
cd backend
mvn spring-boot:run
```
Si Maven esta usando Java 8 en tu equipo, usa el script incluido:
```powershell
cd backend
powershell -ExecutionPolicy Bypass -File .\run-backend.ps1
```

La API estara en `http://localhost:8080/api`.
La consola H2 estara en `http://localhost:8080/h2-console`.

Datos de conexion H2:
- JDBC URL: `jdbc:h2:file:./data/baloncestodb`
- JDBC URL absoluta si la anterior falla: `jdbc:h2:file:C:/Users/Asier/Desktop/CopiPlayers-master/backend/data/baloncestodb`
- Usuario: `sa`
- Password: dejar vacio

Las tablas `equipo` y `jugador` se crean desde `src/main/resources/schema.sql`.
Los datos iniciales se cargan desde `src/main/resources/data.sql` sin duplicarse.
---
## Arrancar el Frontend
```bash
cd frontend
npm install
ng serve
```
La app estará en `[localhost](http://localhost:4200)`.
---
## Endpoints de la API
| Método | Ruta                          | Descripción                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/equipos`                | Listar todos los equipos           |
| GET    | `/api/equipos/{id}`           | Detalle de un equipo               |
| POST   | `/api/equipos`                | Crear un equipo                    |
| GET    | `/api/equipos/{id}/jugadores` | Jugadores de un equipo (1:M)       |
| GET    | `/api/jugadores`              | Listar todos los jugadores         |
| GET    | `/api/jugadores/{id}`         | Detalle de un jugador              |
| POST   | `/api/jugadores`              | Crear un jugador (enviar equipoId) |
---
## Tecnologías
- Angular 21 (Standalone, Signals, Reactive Forms)
- Spring Boot 3.3 + Spring Data JPA
- Base de datos H2 en archivo para desarrollo
- Maven + Java 17
