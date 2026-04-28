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
  res.send("API rodando 🚀");
});

app.post("/leads", async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).json({ error: "Dados obrigatórios faltando" });
  }

  const { error } = await supabase
    .from("leads")
    .insert([
      {
        nome,
        email,
        telefone,
        status: "novo"
      }
    ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar lead" });
  }

  console.log("Lead salvo:", nome, email, telefone);

  res.status(201).json({ message: "Lead salvo com sucesso" });
});

app.get("/leads", async (req, res) => {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    return res.status(500).json({ error: "Erro ao buscar leads" });
  }

  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
