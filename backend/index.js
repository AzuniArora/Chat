const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const faqs = require("./data/faqData");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // replace with your app's origin if needed
    methods: ["GET", "POST"]
  }
});

// When a client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("userQuestion", (question) => {
    console.log("User asked:", question);
  
    const normalized = question.toLowerCase();
  
    // Better matching: check if any keyword from FAQ exists in the question
    const matched = faqs.find((faq) =>
      faq.keywords.some((keyword) =>
        normalized.includes(keyword.toLowerCase())
      )
        );
  
    if (matched) {
      socket.emit("botAnswer", matched.answer);
    } else {
      socket.emit("botAnswer", "Sorry, I don't have an answer for that.");
    }
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Test API
app.get("/", (req, res) => {
  res.send("Chatbot API is running...");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
