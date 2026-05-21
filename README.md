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
La API estará en `[localhost](http://localhost:8080/api)`.
La consola H2 en `[localhost](http://localhost:8080/h2-console)` (JDBC URL: `jdbc:h2:mem:baloncestodb`).
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
## Ejemplo JSON — Crear jugador
```json
{
  "nombre": "Luka Dončić",
  "posicion": "Base",
  "dorsal": 77,
  "altura": 2.01,
  "equipoId": 1
}
```
---
## Problemas encontrados durante el desarrollo
_(Documentar aquí los problemas que vayáis encontrando)_
- ...
---
## Tecnologías
- Angular 21 (Standalone, Signals, Reactive Forms)
- Spring Boot 3.3 + Spring Data JPA
- Base de datos H2 en memoria
- Maven + Java 17