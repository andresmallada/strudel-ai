# 🎵 Strudel AI 

> *"Quería hacer música con Strudel, pero leer documentación es para gente con paciencia (mucha). Así que hice que una IA lo hiciera por mí... Usando otra IA.🫡"*

## ⁉️ ¿Qué es esto?

Este es un fork de [Strudel](https://strudel.cc) (el maravilloso entorno de live coding musical) con un **Agente de IA** integrado que genera código Strudel a partir de descripciones en lenguaje natural.

**Plot twist:** Todo este fork lo he montado usando IA (Windsurf + Claude Sonnet 4.5). Sí: usé una IA para construir una IA que escribe música. La serpiente mordiéndose la cola. Arte moderno.

### El origen de esta historia

**POV:** tarde tonta de domingo, móvil en mano, scroll insulso en TikTok, y aparece un vídeo guapísimo de una ["Algorave"](https://www.youtube.com/watch?v=MnmGjI8MmOE&t=2664s) haciendo live coding con Strudel. “¡Qué guapada!”, pensé. Luego miré la documentación... Mini-notation… ritmos euclidianos… bancos de sonido…

*Ufff, qué pereza, pero tengo que probarlo antes de que se me pasen las ganas...*

¿Y por qué no decirle a la herramienta lo que quiero hacer: “hazme un beat techno con unos drums 909 y un bajo acid”, y que ella se coma toda la sintaxis?

**Un par de horas de vibe-coding después:** Aquí estamos.

---

## ✨ ¿Qué hay de nuevo respecto al Strudel original?

| Función | Descripción |
|---------|-------------|
| 🤖 **Pestaña AI Agent** | Panel nuevo donde describes música en lenguaje natural |
| 🧠 **Integración con LLMs** | Compatible con APIs OpenAI-like (GPT-4, Claude, oLLame Local) |
| 📝 **System prompt** | Mejorable, pero es comienzo |
| 🎯 **Grounding** | Do's ✅ y dont's ❌ para evitar código inválido |
| 🔄 **Construcción iterativa** | Amplía tu código sin romper lo anterior (concatena, no sustituye en base al contexto del editor) |
| 💾 **Panel de historial** | Revisa y reutiliza patrones generados anteriormente |
| ⚙️ **Configurable vía .env** | API keys y ajustes sin tocar el código fuente |

---

## 🛠️ Cómo funciona

La idea es pedirle cosas paso a paso. Por ejemplo:

1. "Mete un bombo four on the floor"
2. "Añade una caja en blancas en los tiempos 2 y 4"
3. "Añade un close hi hats en semicorcheas"
4. "Añade unos open hi hat en corcheas a contratiempo"
5. "Añade un bajo en re de una sola nota"
6. "Añade una melodía de 3 acordes en re"
7. "Súbelos una octava"

Y la IA generará algo así:

```javascript
stack(
  s("bd*4").bank("tr909"),
  s("~ sd ~ sd").bank("tr909"),
  s("hh*16").bank("tr909").gain(0.5),
  s("~ oh ~ oh").bank("tr909").gain(0.6),
  note("d3").s("sawtooth").gain(0.7),
  note("<d4 f#4 a4>").s("sawtooth").gain(0.6).room(0.4)
)
```
De esta forma se disfruta del proceso de evolución que va generando la superposición de patrones.

La IA está instruida (a base de  prompt-engineering y ensayo/error) para:

- ✅ Usar siempre `.s("sawtooth")` (u otro synth) con `note()` 
- ✅ Aplicar `.bank()` solo a baterías, no a melodías
- ✅ Mantener las multiplicaciones DENTRO de las comillas (`s("bd*4")`)
- ✅ No pisar tu código anterior al pedir cosas nuevas
- ❌ No inventarse samples inexistentes cual DJ iluminado
- ❌ No usar funciones rotas o deprecadas como `.every()`


---

## 🚀 ¿Cómo probarlo?

### Requisitos
- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/installation)
- Una API key (OpenAI, Anthropic, LLM local, Azure…)

### Instalación

```bash
# Clona el fork
git clone https://github.com/andresmallada/strudel-ai.git
cd strudel-ai

# Instala dependencias
pnpm i

# Configura el Agente IA (necesario para usarlo)
cd website
cp .env.example .env
# Edita .env con tu API key:
# PUBLIC_LLM_API_KEY=sk-tu-clave-aquí
# PUBLIC_LLM_API_URL=https://api.openai.com/v1/chat/completions
# PUBLIC_LLM_MODEL=gpt-4o-mini

# Arranca servidor de desarrollo (desde la raíz del proyecto)
cd ..
pnpm dev
```

### Uso

1. Abre `http://localhost:4321` en tu navegador.
2. Haz clic en la pestaña **AI** en el panel inferior.
3. Escribe tu deseo: *"Quiero un beat lo-fi chill con piano y ruido de vinilo"*.
4. Dale a Enter o Generar.
5. 🎵 Disfruta de la música (o ríete del intento).

> **Nota:** Sin API key, Strudel funciona igual, pero la pestaña de "ai" estará de adorno.

---

## 📊 Estadísticas de "Vibe Coding"

| Métrica | Valor |
|--------|-------|
| Código escrito por humanos | ~10% |
| Código generado por IA | ~90% |
| Páginas de documentación leídas | 0.5 |
| TikToks vistos | Demasiados |
| Momentos "¡Funciona!" | 47 |
| Momentos "¿Por qué falla esta m*erda?" | 312 |

### Herramientas culpables
- **IDE:** [Windsurf](https://codeium.com/windsurf) (La alternativa a Cursor).
- **LLM:** Claude Sonnet 4 (vía Cascade).
- **Paciencia:** Nula.
- **Conocimiento previo:** Cuestionable.

---

## ‼️ DISCLAIMER

Este proyecto es solo una **demostración experimental** de desarrollo asistido por IA. No pretende ser un referente técnico ni la forma ideal de integrar IA en Strudel; simplemente muestra lo que puede lograrse rápido con un poco de “vibe coding”.

Hay **mucho margen de mejora**, como por ejemplo:

- Un **system prompt** más sólido y modular (`website/src/ai/strudel_system_prompt.txt`)  
- Crear un **agente real** con memoria y herramientas, no solo una llamada a un LLM.  
- Añadir una **base de conocimiento** con documentación de Strudel, ejemplos anotados y teoría musical.  
- Integrar también la parte de **visuales** que ofrece Strudel.  

Este fork es un punto de partida. Si quieres llevarlo más lejos, **el testigo está ahí para quien quiera recogerlo**.

---

## 🙏 Créditos

- **Strudel Original** - [strudel.cc](https://strudel.cc) | [Codeberg](https://codeberg.org/uzu/strudel)
    - Creado por la increíble comunidad de TidalCycles/Strudel.
    - Ellos hicieron el trabajo duro de verdad.
    - **Web:** <https://strudel.cc>
    - **Documentación (la que no me leí):** <https://strudel.cc/learn>
    - **Blog:** <https://strudel.cc/blog>
    
- **Este fork** 
    - 95% generado por Claude Sonnet 4 vía Windsurf.
    - 5% depuración humana y cabezazos contra el teclado.
    - 100% impulsado por la ley del mínimo esfuerzo.

---

## 🤔 FAQ 

**P: ¿Es esto hacer trampas?**
R: Se llama "trabajar de forma inteligente". Y sí, totalmente.

**P: ¿Has aprendido algo de Strudel haciendo esto?**
R: En contra de mi voluntad, sí. Resulta que absorbes conocimientos cuando te pasas horas depurando el código que escupe la IA.

**P: ¿Debería usar esto en producción?**
R: ¿Usarías en producción algo que hice una tarde de domingo por curiosidad? La respuesta es probablemente "no".

**P: ¿Puedo contribuir?**
R: ¡Claro! Describe lo que quieres en un issue o PR y deja que una IA escriba el código por ti. Es el espíritu del proyecto.

---

*Hecho con 🎵, 🤖 y una cantidad preocupante de delegación en la IA.*
