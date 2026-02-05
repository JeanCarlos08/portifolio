const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuração de Armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/raw';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.json({ status: 'VIRALIA AI Backend Online', engine: 'v2.0.4-beta' });
});

/**
 * ROTA PRINCIPAL: Clip Generation
 * Na vida real, aqui usaríamos IA (Whisper/GPT) para encontrar ganchos
 * e FFmpeg para cortar o vídeo em 9:16.
 */
app.post('/api/generate-clips', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('Nenhum vídeo enviado.');

        console.log(`[VIRALIA] Iniciando processamento de: ${req.file.filename}`);

        // Mock de resposta de "Ganchos Encontrados"
        const clips = [
            { id: 1, start: '00:02:15', end: '00:02:45', hook: 'A única coisa que importa no marketing...', viral_score: 9.8 },
            { id: 2, start: '00:15:20', end: '00:16:10', hook: 'Como eu faturei meu primeiro milhão aos 20 anos', viral_score: 9.2 },
            { id: 3, start: '00:32:05', end: '00:33:00', hook: 'O segredo da retenção absoluta no YouTube', viral_score: 8.9 },
        ];

        // Simulando delay de processamento de rede neural
        setTimeout(() => {
            res.json({
                message: 'Clips gerados com sucesso',
                clips: clips,
                job_id: `viral_${Math.random().toString(36).substr(2, 9)}`
            });
        }, 5000);

    } catch (error) {
        console.error('Erro no processamento:', error);
        res.status(500).json({ error: 'Falha crítica no motor de IA.' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Viralia Engine rodando em http://localhost:${port}`);
});
