# FierceTyke

Monorepo inicial para `fiercetyke.com`: frontend en React + Vite y backend en FastAPI con una separacion limpia por capas.

## Estructura

- `Frontend/`: aplicacion React con arquitectura tipo Atomic Design.
- `Backend/`: API FastAPI con dominio, casos de uso, infraestructura y rutas separadas.
- `docker-compose.yml`: compose principal pensado para Coolify.
- `docker-compose.local.yml`: puertos locales para desarrollo.

## Desarrollo local

Frontend:

```powershell
cd Frontend
npm.cmd install
npm.cmd run dev
```

Backend:

```powershell
cd Backend
python -m venv .venv
.\.venv\Scripts\python -m pip install -r requirements.txt
.\.venv\Scripts\python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Variables recomendadas:

- Copia `.env.example` a `.env` para compose.
- Copia `Frontend/.env.example` a `Frontend/.env` si ejecutas Vite directo.
- Copia `Backend/.env.example` a `Backend/.env` si vas a cargar variables con tu runtime.

## Contenedores Locales

Para desarrollo local con puertos publicados:

```powershell
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

Frontend: `http://localhost:8080`

Backend: `http://localhost:8000`

## Coolify

Usa `docker-compose.yml` como archivo principal en Coolify.

- Asigna el dominio `https://fiercetyke.com` al servicio `frontend`, puerto interno `80`.
- No publiques dominio para `backend`; Nginx lo consume internamente y expone la API bajo `/api`.
- Configura estas variables en Coolify antes de desplegar:
  - `TOKEN_SECRET`: secreto largo y unico.
  - `ADMIN_USERNAME`: usuario administrador.
  - `ADMIN_PASSWORD`: contrasena fuerte.
  - `ALLOWED_ORIGINS`: `https://fiercetyke.com`.
  - `VITE_API_URL`: `/api/v1`.

El compose incluye healthchecks para ambos servicios y evita `container_name` para que Coolify pueda gestionar los contenedores con su propio naming.

Credenciales iniciales de desarrollo:

- `ADMIN_USERNAME=admin`
- `ADMIN_PASSWORD=change-me-now`

Cambia `TOKEN_SECRET` y `ADMIN_PASSWORD` antes de exponer el sitio.

