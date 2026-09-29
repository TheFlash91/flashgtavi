# CLAUDE --- Guía Técnica para Desarrollo con IA

## 1. Propósito

`CLAUDE.md` es la guía técnica operativa para trabajar en el **GTA VI
Unofficial Companion Site** utilizando asistentes de IA de desarrollo.

Este archivo **no reemplaza** al Master Document.

Jerarquía de autoridad:

1.  Master Document --- decisiones de producto, contenido, diseño,
    arquitectura y reglas cerradas.
2.  `CLAUDE.md` --- procedimiento técnico para implementar, validar,
    probar y documentar cambios con IA.
3.  Código existente --- solo cuando no contradiga los documentos
    anteriores.
4.  Convenciones técnicas --- cuando no exista una decisión superior.

Si existe una contradicción entre `CLAUDE.md` y el Master Document,
prevalece el Master Document.

------------------------------------------------------------------------

## 2. Regla principal para cualquier IA

La IA no debe preguntarse:

> "¿Qué sería mejor para el producto?"

Debe preguntarse:

> "¿Cómo implemento exactamente lo que el proyecto ya decidió?"

Si una decisión está definida, se implementa.

Si una decisión no está definida y puede afectar producto, UX,
contenido, arquitectura, seguridad, infraestructura, fuentes, datos
oficiales o comportamiento visible:

**DETENERSE Y SOLICITAR APROBACIÓN.**

No asumir.

------------------------------------------------------------------------

## 3. Identidad del proyecto

-   Identidad del sitio: `GTA VI Unofficial Companion Site`
-   Identidad del desarrollador: `Flash Nexus`
-   Flash Nexus no es la identidad visual del sitio.
-   El proyecto es independiente y no representa a Rockstar Games.
-   El contenido sobre Grand Theft Auto VI debe basarse en información
    oficial aprobada.
-   No utilizar rumores, teorías, filtraciones ni contenido dudoso como
    hechos.

------------------------------------------------------------------------

## 4. Stack aprobado

-   Next.js
-   React
-   TypeScript
-   App Router
-   CSS Modules o sistema CSS propio
-   next-intl
-   Vitest
-   React Testing Library
-   Playwright
-   ESLint
-   Prettier

TypeScript debe utilizar configuración estricta.

No cambiar el stack sin aprobación.

No agregar dependencias simplemente porque una IA considere que son
"mejores".

Antes de agregar una dependencia, verificar:

-   necesidad real;
-   compatibilidad;
-   impacto en bundle;
-   seguridad;
-   licencia;
-   mantenimiento;
-   compatibilidad con el stack;
-   posibilidad de resolverlo con capacidades nativas.

------------------------------------------------------------------------

## 5. Arquitectura obligatoria

Flujo conceptual:

``` text
Data
↓
Validation
↓
Domain
↓
Application
↓
Presentation
↓
Reusable UI
↓
Page
```

Responsabilidades:

### Data

Contiene:

-   catálogos;
-   configuración;
-   referencias Media;
-   fuentes;
-   traducciones;
-   datos aprobados.

No contiene lógica de presentación.

### Validation

Valida:

-   IDs;
-   slugs;
-   claves i18n;
-   referencias Media;
-   relaciones;
-   categorías;
-   fechas;
-   providers;
-   URLs;
-   configuración.

Los errores estructurales no deben autocorregirse.

### Domain

Contiene reglas puras de negocio:

-   Countdown;
-   Release Progress;
-   selección Featured;
-   orden editorial;
-   validaciones de reglas de dominio.

Debe poder probarse sin React.

### Application

Contiene casos de uso:

-   `GetHomeContent`
-   `GetCharacters`
-   `GetCharacterBySlug`
-   `GetLocations`
-   `GetLocationBySlug`
-   `GetTrailers`
-   `GetTrailerCatalog`
-   `GetNews`
-   `GetNewsBySlug`

### Presentation

Transforma resultados para la interfaz.

No inventa información.

### UI

Presenta datos.

No decide qué contenido editorial existe.

------------------------------------------------------------------------

## 6. Source of Truth

Cada información debe tener una única fuente.

``` text
ReleaseConfig     → lanzamiento
Character Catalog → personajes
Location Catalog  → ubicaciones
Trailer Catalog   → videos
News Catalog      → noticias
Media Catalog     → assets
i18n Catalog      → textos
Design System     → presentación visual
```

No duplicar catálogos en Home y páginas internas.

Home consume los catálogos; no crea sus propios arrays editoriales.

------------------------------------------------------------------------

## 7. Protocolo de trabajo de una IA

Antes de modificar código:

1.  Leer el Master Document completo.
2.  Leer `CLAUDE.md`.
3.  Identificar la sección que gobierna el cambio.
4.  Identificar la fuente única de verdad afectada.
5.  Identificar componentes, casos de uso y tests afectados.
6.  Verificar si la decisión está cerrada.
7.  Determinar el cambio mínimo necesario.
8.  Implementar.
9.  Ejecutar validaciones.
10. Ejecutar tests.
11. Ejecutar lint.
12. Ejecutar TypeScript.
13. Ejecutar build.
14. Ejecutar E2E críticos cuando corresponda.
15. Revisar responsive, accesibilidad e i18n.
16. Revisar que no exista contenido inventado.
17. Informar resultados reales.

No declarar una tarea terminada solo porque "el código parece correcto".

------------------------------------------------------------------------

## 8. Protocolo de cambio mínimo

La IA debe modificar únicamente lo necesario.

No hacer junto con una tarea:

-   rediseños no solicitados;
-   refactors generales;
-   cambios de arquitectura;
-   cambios de stack;
-   nuevas dependencias;
-   nuevas funcionalidades;
-   cambios editoriales;
-   cambios de navegación;
-   cambios de contenido.

salvo que el Master Document lo exija o exista aprobación explícita.

------------------------------------------------------------------------

## 9. i18n --- regla absoluta

No existe texto visible hardcodeado.

Todo texto visible debe proceder de:

``` text
messages/en.json
messages/es.json
```

Esto incluye:

-   botones;
-   labels;
-   títulos;
-   subtítulos;
-   errores;
-   estados;
-   nombres;
-   nombres de personajes;
-   nombres de ciudades;
-   ubicaciones;
-   compañías;
-   marcas;
-   títulos oficiales;
-   nombres de plataformas;
-   alt text visible;
-   créditos visibles.

Incluso si EN y ES tienen exactamente el mismo valor, deben utilizar una
clave i18n.

Ejemplo correcto:

``` ts
{
  nameKey: "characters.jason.name"
}
```

Ejemplo incorrecto:

``` ts
{
  name: "Jason Duval"
}
```

No usar traducción automática en runtime.

No usar un idioma como fallback editorial del otro.

Si falta una traducción:

``` text
ERROR DE DATOS/TRADUCCIÓN
```

------------------------------------------------------------------------

## 10. Consistencia lingüística

La documentación humana debe mantenerse en español.

Se permite inglés cuando sea:

-   identificador de código;
-   enum;
-   nombre de API;
-   nombre de librería;
-   estándar técnico;
-   ruta;
-   slug;
-   clave i18n;
-   nombre oficial que deba conservarse.

No mezclar idiomas dentro de una descripción editorial.

Incorrecto:

``` text
Jason grew up...
terminó trabajando...
```

Correcto:

``` text
Jason creció...
terminó trabajando...
```

Los valores EN/ES pertenecen a los archivos i18n, no a componentes ni
catálogos.

------------------------------------------------------------------------

## 11. Contenido oficial

La IA no puede:

-   inventar datos;
-   completar información faltante;
-   inferir relaciones;
-   crear biografías;
-   convertir rumores en hechos;
-   incorporar filtraciones;
-   generar noticias;
-   decidir nuevas ubicaciones;
-   crear nuevos personajes;
-   sustituir una fuente oficial;
-   corregir editorialmente un dato sin aprobación.

Si Rockstar Games o un partner oficial no confirma algo:

**NO SE PRESENTA COMO HECHO.**

Si existe incertidumbre:

**OMITIR.**

------------------------------------------------------------------------

## 12. Media

Media es la única fuente de verdad de los recursos visuales y
audiovisuales aprobados.

Los componentes consumen referencias Media.

No colocar URLs arbitrarias en componentes.

No utilizar como oficiales:

-   filtraciones;
-   fan art;
-   imágenes dudosas;
-   capturas no aprobadas;
-   material generado por IA presentado como oficial.

Se permite optimización técnica:

-   compresión;
-   conversión;
-   variantes responsive;
-   recorte técnico correcto;
-   overlay oscuro cuando esté aprobado.

No se permite:

-   deformar;
-   estirar;
-   recolorear;
-   aplicar filtros;
-   modificar el contenido;
-   sustituir automáticamente un asset aprobado.

------------------------------------------------------------------------

## 13. Countdown

Fuente única:

``` text
releaseDate = 2026-11-19
releaseTime = 00:00
releaseTimezoneMode = LOCAL
defaultTimezone = America/Managua
```

Resolución:

1.  `Intl.DateTimeFormat().resolvedOptions().timeZone`
2.  si es inválido/no disponible → `America/Managua`

No usar:

-   IP;
-   país;
-   geolocalización;
-   offsets fijos;
-   servicios de pago.

La función de dominio debe ser pura y testeable:

``` ts
getCountdown(targetInstant, currentInstant)
```

El temporizador de UI debe actualizar aproximadamente una vez por
segundo, limpiarse correctamente y detenerse al finalizar.

Al llegar al objetivo:

``` text
AVAILABLE NOW
DISPONIBLE AHORA
```

La hora `00:00` es una decisión funcional del proyecto y no debe
presentarse como hora oficialmente publicada por Rockstar salvo
confirmación oficial posterior.

------------------------------------------------------------------------

## 14. Release Progress

Fuente:

``` text
progressStartDate = 2026-01-01
releaseDate = 2026-11-19
```

Regla:

``` text
DaysTranscurred = DateDiff(StartDate, DateNow)
DaysTotal = DateDiff(StartDate, EndDate)
Progress = (DaysTranscurred / DaysTotal) * 100
```

Aplicar:

``` text
0 <= Progress <= 100
```

La presentación admite máximo dos decimales y elimina ceros finales.

El degradado obligatorio de la barra es:

``` text
#FF4FA3 → #FFD166 → #35C8E8
```

No sustituirlo.

------------------------------------------------------------------------

## 15. News

La fuente es el News Catalog.

Reglas críticas:

-   exactamente una Featured;
-   cero Featured = error;
-   más de una Featured = error;
-   Secondary = dos noticias publicadas más recientes excluyendo
    Featured;
-   orden por fecha descendente;
-   no ordenar por popularidad;
-   no usar IA para decidir relevancia;
-   no crear contenido faltante.

Los títulos, resúmenes y contenidos utilizan claves i18n:

``` ts
titleKey
summaryKey
contentKey
```

------------------------------------------------------------------------

## 16. Characters

Fuente: Character Catalog.

Orden editorial aprobado:

``` text
Jason Duval
Lucia Caminos
Cal Hampton
Brian Heder
Boobie Ike
Dre’Quan Priest
Real Dimez
Raul Bautista
```

Real Dimez es un perfil grupal para Bae-Luxe y Roxy.

No agregar:

-   edad;
-   fecha de nacimiento;
-   altura;
-   peso;
-   nacionalidad;
-   estadísticas;
-   armas;
-   habilidades;
-   teorías;
-   rumores;
-   filtraciones;
-   información no aprobada.

No inferir relaciones.

------------------------------------------------------------------------

## 17. Locations

Fuente: Location Catalog.

Orden aprobado:

``` text
Vice City
Leonida Keys
Port Gellhorn
Ambrosia
Grassrivers
Mount Kalaga National Park
```

No crear categorías ni inventar datos de:

-   población;
-   coordenadas;
-   distancias;
-   actividades;
-   economía;
-   clima;
-   NPCs;
-   vehículos;
-   historia no aprobada.

------------------------------------------------------------------------

## 18. Trailers

Fuente: Trailer Catalog.

Provider inicial:

``` text
YOUTUBE
```

Reproducción:

-   thumbnail primero;
-   acción explícita del usuario;
-   sin autoplay;
-   sin audio automático;
-   sin streaming propio.

No inventar:

-   duración;
-   número de tráiler;
-   protagonistas;
-   características;
-   plataformas;
-   estadísticas.

------------------------------------------------------------------------

## 19. Seguridad

Reglas mínimas:

-   TypeScript estricto;
-   datos externos validados;
-   URLs HTTPS;
-   rechazar `javascript:`;
-   rechazar `data:`;
-   rechazar `file:`;
-   no `dangerouslySetInnerHTML` inicialmente;
-   secretos nunca en frontend;
-   secretos nunca en repositorio;
-   no secretos en `NEXT_PUBLIC_*`;
-   `.env.local` no se versiona;
-   `.env.example` solo contiene nombres;
-   CSP y encabezados de seguridad;
-   no wildcards inseguros para resolver errores.

Nunca mostrar stack traces al usuario.

------------------------------------------------------------------------

## 20. SEO

SEO es presentación derivada de datos aprobados.

Debe ser:

-   localizado EN/ES;
-   determinista;
-   consistente con las rutas;
-   con canonical;
-   con hreflang;
-   con Open Graph;
-   con Twitter Cards;
-   con sitemap;
-   con robots.

No inventar:

-   autores;
-   ratings;
-   reseñas;
-   precios;
-   fechas;
-   eventos;
-   organizaciones.

------------------------------------------------------------------------

## 21. Accesibilidad

Objetivo:

**WCAG 2.2 AA**

Verificar:

-   teclado;
-   foco visible;
-   orden de foco;
-   headings;
-   contraste;
-   nombres accesibles;
-   alt text;
-   menú móvil;
-   Escape;
-   retorno de foco;
-   botones;
-   touch targets;
-   estados;
-   Countdown;
-   Progress;
-   filtros;
-   Load More;
-   video;
-   reduced motion;
-   errores localizados.

------------------------------------------------------------------------

## 22. Rendimiento

Prioridades:

1.  móvil;
2.  Hero;
3.  Media;
4.  LCP;
5.  CLS;
6.  INP;
7.  TTFB.

Evitar:

-   JS innecesario;
-   terceros innecesarios;
-   analítica no aprobada;
-   trackers;
-   session recording;
-   efectos permanentes;
-   dependencias innecesarias.

El video externo comienza con thumbnail y reproducción explícita.

------------------------------------------------------------------------

## 23. Estados

Los componentes deben manejar cuando corresponda:

``` text
LOADING
SUCCESS
EMPTY
ERROR
```

`EMPTY` solo es válido cuando realmente no hay resultados.

La ausencia de contenido obligatorio es:

``` text
ERROR
```

Nunca utilizar datos falsos para ocultar un error.

------------------------------------------------------------------------

## 24. Pruebas

Ejecutar según corresponda:

``` bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Si el proyecto utiliza nombres distintos, seguir los comandos definidos
por el `package.json` real.

No inventar comandos.

No eliminar tests para hacer pasar una ejecución.

No debilitar tests para ocultar errores.

------------------------------------------------------------------------

## 25. Áreas mínimas de testing

### Unitarias

-   Countdown;
-   Release Progress;
-   validaciones;
-   selección Featured;
-   orden editorial;
-   utilidades puras.

### Componentes

-   estados;
-   i18n;
-   accesibilidad;
-   interacción;
-   responsive cuando pueda probarse.

### E2E

-   navegación;
-   EN/ES;
-   rutas;
-   Home;
-   Characters;
-   Locations;
-   Trailers;
-   News;
-   detalles;
-   theme;
-   Countdown;
-   Progress.

### Casos límite

-   fechas de inicio;
-   fecha de lanzamiento;
-   fechas posteriores;
-   configuración inválida;
-   timezone inválido;
-   traducción faltante;
-   Media faltante;
-   Featured faltante;
-   Featured duplicada;
-   relaciones inválidas.

------------------------------------------------------------------------

## 26. Git

Versionar:

-   código;
-   configuración no secreta;
-   catálogos;
-   traducciones;
-   referencias Media;
-   tests;
-   documentación.

No versionar:

-   `.env.local`;
-   secretos;
-   `node_modules`;
-   caches;
-   archivos temporales;
-   artefactos personales.

Cada cambio importante debe ser identificable y reversible.

------------------------------------------------------------------------

## 27. Entornos

Entornos:

``` text
Development
Test
Preview
Production
```

Las diferencias entre entornos deben ser principalmente técnicas.

No usar el entorno para cambiar arbitrariamente:

-   contenido;
-   orden editorial;
-   personajes;
-   ubicaciones;
-   noticias;
-   navegación.

Production solo utiliza contenido aprobado.

------------------------------------------------------------------------

## 28. Build y despliegue

Flujo:

``` text
Cambio
↓
Validación
↓
Tests
↓
Lint
↓
TypeScript
↓
Build
↓
E2E críticos
↓
Verificación
↓
Despliegue
↓
Smoke test
```

No desplegar un artefacto que no haya pasado las validaciones críticas.

No modificar contenido editorial durante el despliegue.

------------------------------------------------------------------------

## 29. Observabilidad

La observabilidad es exclusivamente técnica.

Puede registrar:

-   errores de aplicación;
-   errores de build;
-   errores de despliegue;
-   errores de rutas;
-   errores de configuración;
-   errores Media;
-   errores de recursos externos;
-   métricas técnicas.

No debe incluir:

-   secretos;
-   datos privados;
-   tracking de usuarios;
-   fingerprinting;
-   publicidad.

La observabilidad nunca decide qué contenido editorial publicar.

------------------------------------------------------------------------

## 30. Criterio para pedir aprobación

La IA debe detenerse cuando el cambio afecte:

-   identidad del sitio;
-   branding;
-   diseño;
-   UX;
-   navegación;
-   contenido;
-   traducciones editoriales;
-   personajes;
-   ubicaciones;
-   noticias;
-   tráileres;
-   fuentes;
-   categorías;
-   Featured;
-   arquitectura;
-   stack;
-   seguridad;
-   infraestructura;
-   proveedores;
-   dominios permitidos;
-   Media;
-   nuevas funcionalidades.

La IA puede resolver por sí misma detalles estrictamente técnicos que no
cambien ninguna de esas áreas.

------------------------------------------------------------------------

## 31. Prohibiciones absolutas

Nunca:

-   inventar;
-   asumir decisiones faltantes;
-   mezclar idiomas en contenido editorial;
-   hardcodear texto visible;
-   traducir automáticamente en runtime;
-   usar un idioma como fallback editorial;
-   sustituir Media aprobado sin autorización;
-   incorporar filtraciones;
-   incorporar rumores;
-   incorporar teorías;
-   crear noticias automáticamente;
-   modificar el catálogo por iniciativa propia;
-   cambiar el stack sin aprobación;
-   agregar dependencias sin necesidad;
-   ocultar errores;
-   borrar tests para conseguir PASS.

------------------------------------------------------------------------

## 32. Definition of Done

Una tarea está terminada solo cuando, cuando corresponda:

-   respeta el Master Document;
-   respeta `CLAUDE.md`;
-   mantiene la arquitectura;
-   mantiene i18n;
-   usa la fuente única correcta;
-   utiliza Media aprobado;
-   mantiene responsive;
-   mantiene accesibilidad;
-   mantiene seguridad;
-   mantiene SEO;
-   mantiene rendimiento;
-   cubre estados;
-   pasa tests;
-   pasa lint;
-   pasa TypeScript;
-   pasa build;
-   no introduce contradicciones conocidas.

------------------------------------------------------------------------

## 33. Checklist operativo de IA

Antes de responder "terminado":

``` text
[ ] Leí el Master Document
[ ] Leí CLAUDE.md
[ ] Identifiqué la fuente de verdad
[ ] No cambié decisiones cerradas
[ ] No inventé contenido
[ ] No inventé funcionalidad
[ ] No hardcodeé texto visible
[ ] Revisé EN/ES
[ ] Revisé Media
[ ] Revisé estados
[ ] Revisé accesibilidad
[ ] Revisé seguridad
[ ] Ejecuté tests aplicables
[ ] Ejecuté lint
[ ] Ejecuté TypeScript
[ ] Ejecuté build
[ ] Revisé E2E críticos cuando aplica
[ ] Informé cualquier error real
```

------------------------------------------------------------------------

## 34. Regla final

**El Master Document decide qué debe existir.**

**`CLAUDE.md` define cómo debe trabajar una IA para implementarlo
correctamente.**

**El código implementa ambas cosas; no las redefine.**

Si falta una decisión importante:

**DETENERSE Y PREGUNTAR.**

Si la decisión es puramente técnica y no cambia las reglas del proyecto:

**resolver de forma simple, mantenible, segura y verificable.**
