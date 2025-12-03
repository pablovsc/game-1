# 🎲 RPG Tabletop

Una aplicación web moderna para juegos de rol en tiempo real con interfaz intuitiva y comunicación en vivo.

## ✨ Características

- **🎮 Multijugador en tiempo real** - Conecta Game Masters y jugadores
- **👑 Panel de Game Master** - Controla enemigos y el flujo del juego
- **⚔️ Hoja de jugador** - Gestiona personajes y realiza acciones
- **🎲 Sistema de dados** - Dados virtuales (d4, d6, d8, d10, d12, d20)
- **📜 Log de aventuras** - Registro en tiempo real de todas las acciones
- **🎨 Interfaz moderna** - Diseño atractivo con gradientes y animaciones

## 🚀 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm

### Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/pablovsc/game-1.git
cd game-1
```

2. **Instalar dependencias del servidor**
```bash
cd server
npm install
```

3. **Instalar dependencias del cliente**
```bash
cd ../client
npm install
```

## 🎯 Uso

### Ejecutar el proyecto

1. **Iniciar el servidor** (Terminal 1)
```bash
cd server
npm start
```

2. **Iniciar el cliente** (Terminal 2)
```bash
cd client
npm run dev
```

3. **Acceder a la aplicación**
- Abrir navegador en `http://localhost:5173`
- Elegir rol: Game Master o Jugador
- ¡Comenzar la aventura!

## 🎨 Personalización

### Imagen de fondo
Coloca tu imagen de fondo en `client/public/rpg-background.jpg` para personalizar la pantalla de inicio.

## 🛠️ Tecnologías

**Frontend:**
- React 19
- Vite
- TailwindCSS
- Socket.io-client

**Backend:**
- Node.js
- Express
- Socket.io
- CORS

## 📝 Licencia

MIT License