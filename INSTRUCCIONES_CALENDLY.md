# 📅 Instrucciones para Configurar Calendly

Este documento te guiará paso a paso para configurar el sistema de agendamiento de citas en el sitio web de Ely Morentin.

---

## 🎯 ¿Qué es Calendly?

Calendly es una herramienta profesional de agendamiento que:
- ✅ Se sincroniza automáticamente con Google Calendar
- ✅ Evita dobles reservas
- ✅ Envía recordatorios automáticos por email
- ✅ Permite que los clientes elijan fecha y hora según tu disponibilidad
- ✅ Es **GRATIS** para uso básico (1 tipo de evento)

---

## 📋 Paso 1: Crear Cuenta en Calendly

1. Ve a **https://calendly.com**
2. Haz clic en **"Sign Up"** (Registrarse)
3. Puedes registrarte con:
   - Email y contraseña
   - O directamente con tu cuenta de Google (recomendado)

4. Elige el plan **"Basic" (Gratis)**

---

## 🔗 Paso 2: Conectar Google Calendar

1. Una vez dentro de Calendly, ve a **"Settings"** (Configuración)
2. Haz clic en **"Calendar Connections"** (Conexiones de calendario)
3. Selecciona **"Connect"** junto a Google Calendar
4. Autoriza a Calendly para acceder a tu calendario
5. Selecciona qué calendario quieres usar para las citas

> **Importante:** Calendly verificará los eventos en ese calendario para evitar conflictos.

---

## 🎫 Paso 3: Crear un Tipo de Evento

1. En el dashboard de Calendly, haz clic en **"+ New Event Type"**
2. Selecciona **"One-on-One"** (Uno a uno)
3. Configura los siguientes campos:

### Configuración Básica:
- **Event name:** `Asesoría de Seguros - 30 min`
- **Duration:** `30 minutes`
- **Location:** 
  - Opción 1: "Phone Call" (el cliente ingresa su teléfono)
  - Opción 2: "Google Meet" (se crea automáticamente)
  - Opción 3: "Zoom" (si tienes cuenta)
  - Opción 4: "WhatsApp Call" (necesitas poner tu número)

### Descripción del Evento:
```
Sesión de asesoría gratuita para evaluar tus necesidades de seguros.

En esta llamada hablaremos sobre:
• Tus necesidades de protección personal y familiar
• Opciones de seguros de vida, gastos médicos y ahorro
• Cotización personalizada sin compromiso

¡Prepara tus dudas! Estoy aquí para ayudarte.
```

### Preguntas al Cliente (Opcional pero Recomendado):
Agrega estas preguntas antes de la cita:
1. **¿Cuál es tu principal interés?**
   - Seguro de Vida
   - Gastos Médicos Mayores
   - Ahorro y Retiro
   - Otro

2. **¿Número de WhatsApp?** (para confirmación)

3. **Comentarios adicionales** (opcional)

---

## ⏰ Paso 4: Configurar Disponibilidad

1. Ve a **"Availability"** en el menú
2. Define tus horarios disponibles, por ejemplo:
   - **Lunes a Viernes:** 9:00 AM - 6:00 PM
   - **Sábado:** 10:00 AM - 2:00 PM
   - **Domingo:** Cerrado

3. Configura:
   - **Time zone:** `America/Mexico_City` (o tu zona horaria)
   - **Date range:** Cuántos días en el futuro pueden agendar (ej: 60 días)
   - **Minimum scheduling notice:** Tiempo mínimo de anticipación (ej: 2 horas)

---

## 🎨 Paso 5: Personalizar Apariencia

1. En la configuración del evento, ve a la pestaña **"What event is this?"**
2. Elige un color representativo (el sitio usa tonos verdes/dorados)
3. Sube una foto de perfil profesional

---

## 🔗 Paso 6: Obtener el Link de Calendly

1. Una vez configurado el evento, haz clic en **"Copy Link"**
2. El link será algo como:
   ```
   https://calendly.com/ELY-USUARIO/asesoria-30min
   ```

3. **Guarda este link**, lo necesitaremos en el siguiente paso.

---

## 💻 Paso 7: Integrar Calendly en el Sitio Web

### Opción A: Widget Inline (Recomendado)

1. Abre el archivo `index.html` en tu editor de código
2. Busca la línea que dice: `TU-USUARIO-CALENDLY`
3. Reemplázala con tu link de Calendly

**Ejemplo:**
```html
<!-- ANTES -->
data-url="https://calendly.com/TU-USUARIO-CALENDLY/asesoria-30min?hide_gdpr_banner=1&primary_color=C5A065"

<!-- DESPUÉS (ejemplo) -->
data-url="https://calendly.com/elymorentin/asesoria-30min?hide_gdpr_banner=1&primary_color=C5A065"
```

4. Ve al final del archivo `index.html` (líneas 317-318)
5. **Descomenta** las líneas del script de Calendly:

**ANTES:**
```html
<!-- <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"> -->
<!-- <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script> -->
```

**DESPUÉS:**
```html
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
```

6. Guarda el archivo
7. Abre `index.html` en tu navegador y ve a la sección **"Agendar Asesoría"**

---

## ✅ Verificación

Si todo está bien configurado:
1. El placeholder desaparecerá automáticamente
2. Verás el calendario de Calendly integrado en la página
3. Los clientes podrán elegir fecha y hora directamente desde tu sitio

---

## 🎁 Mejoras Opcionales

### Email de Confirmación Personalizado
1. En Calendly, ve a **"Notifications & Cancellation"**
2. Personaliza el email de confirmación con tu marca

### Recordatorios Automáticos
1. Configura recordatorios automáticos:
   - 24 horas antes
   - 1 hora antes

### Página de Agradecimiento
1. En **"Confirmation Page"**, personaliza el mensaje:
```
¡Gracias! Tu cita ha sido agendada exitosamente.

Revisa tu correo para los detalles y el link de la videollamada.

Nos vemos pronto,
Ely Morentin
```

---

## 🆘 Solución de Problemas

### El widget no aparece
- ✓ Verifica que descomentaste los scripts de Calendly
- ✓ Asegúrate de que el link esté correcto (sin espacios extra)
- ✓ Abre la consola del navegador (F12) y busca errores

### Los horarios se ven en otra zona horaria
- ✓ Revisa la configuración de zona horaria en Calendly
- ✓ Calendly ajusta automáticamente al timezone del cliente

### Dobles reservas
- ✓ Verifica que Google Calendar esté conectado correctamente
- ✓ Asegúrate de que Calendly tiene permisos para leer eventos

---

## 📞 Alternativa: Usar Cal.com (Gratis y Open Source)

Si prefieres una alternativa gratuita sin límites:
1. Ve a **https://cal.com**
2. Sigue los mismos pasos que con Calendly
3. Cal.com permite eventos ilimitados en plan gratuito

---

## 💡 Consejo Final

Para desarrollo/pruebas, puedes usar cualquier cuenta de Gmail. 

**Cuando el cliente esté listo para producción:**
- Crea la cuenta de Calendly con el email profesional de Ely
- Conecta su Google Calendar real
- Actualiza el link en el `index.html`

---

¿Necesitas ayuda adicional? El código ya está preparado y listo para funcionar. Solo necesitas tu link de Calendly. 🚀
