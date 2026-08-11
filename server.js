const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// فایل‌های پروژه از کنار server.js
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log("✅ کاربر متصل شد:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ کاربر خارج شد:", socket.id);
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("🐔 سرور مرغ دونی روشن شد");
    console.log("🌐 Port:", PORT);
});
