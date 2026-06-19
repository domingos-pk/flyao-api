import { createUser } from "./user.service.js";

export async function register(req, res) {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const user = await createUser({ name, email, phone, password, confirmPassword });

    return res.status(201).json({ user });
  } catch (error) {
    console.error("REGISTER ERROR:", error); // <- já deve estar
    return res.status(500).json({ error: error.message }); // <- muda temporariamente
  }
}
