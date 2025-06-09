module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message.includes('não encontrado')) {
    return res.status(404).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Erro interno do servidor' });
};