require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.post("/leads", async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: "Dados obrigatórios faltando" });
  }

  const { error } = await supabase
    .from("leads")
    .insert([{ nome, email, telefone, status: "novo" }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar lead" });
  }

  console.log("Lead salvo:", nome);

  res.status(201).json({ message: "Lead salvo!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
