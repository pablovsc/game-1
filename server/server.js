const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for MVP
    methods: ["GET", "POST"]
  }
});

let gameState = {
  enemies: [],
  logs: []
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send current state to new user
  socket.emit('update_gamestate', gameState);

  socket.on('join_game', (data) => {
    const joinMsg = `User ${socket.id} joined as ${data.role}`;
    gameState.logs.push(joinMsg);
    io.emit('update_gamestate', gameState);
  });

  socket.on('dm_spawn_enemy', (enemy) => {
    const newEnemy = { ...enemy, id: Date.now() }; // Simple ID generation
    gameState.enemies.push(newEnemy);
    gameState.logs.push(`GM spawned: ${newEnemy.name} (HP: ${newEnemy.hp})`);
    io.emit('update_gamestate', gameState);
  });

  socket.on('player_action', (action) => {
    // action example: { type: 'ATTACK', roll: 15, targetId: 123, playerName: 'Hero' }
    let resultMsg = '';
    
    if (action.type === 'ATTACK') {
      resultMsg = `${action.playerName} rolled ${action.roll} to attack!`;
      // Simple validation logic could go here
    } else {
      resultMsg = `${action.playerName} performed ${action.type}`;
    }

    gameState.logs.push(resultMsg);
    io.emit('update_gamestate', gameState);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
