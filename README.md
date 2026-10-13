# 💥 Estaciones Explosivas

### *Urtaro Lehergarriak*

Un juego educativo y bilingüe para aprender **días, meses y estaciones del año** en español y euskera. Responde preguntas, haz crecer el globo y consigue la explosión final. 🎈

## ✨ Qué incluye

- Preguntas aleatorias con respuestas en español y euskera.
- Pistas opcionales para aprender sin atascarse.
- Explicaciones después de cada respuesta.
- Animaciones de progreso, explosión y celebración.
- Diseño colorido y adaptable a escritorio y móvil.
- Calendario del hemisferio norte.

## ▶️ Jugar en local

No requiere Node.js ni dependencias. Sirve los archivos estáticos con cualquier servidor HTTP:

```bash
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000) en el navegador.

## 🐳 Con Docker

```bash
docker build -t estaciones-explosivas .
docker run --rm -p 8080:80 estaciones-explosivas
```

Después, visita [http://localhost:8080](http://localhost:8080).

## 🗂️ Estructura

```text
├── index.html       # Interfaz del juego
├── game.js          # Preguntas, lógica y animaciones
├── style.css        # Diseño y efectos visuales
├── public/img/      # Personajes, globos y explosiones
└── Dockerfile       # Servidor Nginx para producción
```

## 🎮 Cómo jugar

1. Pulsa **Comenzar / Hasi**.
2. Elige la respuesta correcta o usa la pista 💡.
3. Cada acierto infla el globo.
4. Completa seis aciertos y hazlo explotar. ¡Zorionak! 💥

