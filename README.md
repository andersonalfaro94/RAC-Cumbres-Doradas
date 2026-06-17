# RAC App - Cumbres Doradas S.A.C.
## Sistema de Registro de Actos y Condiciones Subestándar

---

## ¿Qué incluye?

| Módulo | Descripción |
|--------|-------------|
| Nuevo RAC | Formulario completo con tipo, riesgo, lugar, descripción, responsable y foto |
| Registros | Lista filtrable por estado y nivel de riesgo |
| Estadísticas | Conteos y gráficos de barras por tipo y nivel |
| OneDrive | Guardado automático en Excel via Microsoft Graph API |
| PWA | Instalable en Android como app nativa |

---

## Despliegue (3 pasos)

### 1. Subir archivos
Sube los 3 archivos (`index.html`, `manifest.json`, `sw.js`) a cualquiera de estos:
- **GitHub Pages** (gratis): `https://tuusuario.github.io/rac-app/`
- **OneDrive + iframe**: No recomendado para PWA
- **Servidor propio** o hosting simple

### 2. Registrar app en Azure AD
1. Ve a https://portal.azure.com
2. **Azure Active Directory → App registrations → New registration**
3. Nombre: `RAC Cumbres Doradas`
4. Supported account types: `Accounts in this organizational directory only`
5. Redirect URI: `Web` → la URL donde subiste la app
6. **Copiar el Application (client) ID**

### 3. Configurar permisos
En tu app de Azure AD:
1. API permissions → Add permission → Microsoft Graph
2. Delegated permissions: `Files.ReadWrite`, `User.Read`
3. Grant admin consent

### 4. Actualizar el código
En `index.html`, línea ~170:
```javascript
clientId: 'PEGAR_AQUI_TU_CLIENT_ID',
```

---

## Configurar Excel en OneDrive

Crear manualmente el archivo `RAC_CumbresDoradas.xlsx` en la raíz de OneDrive con:
- Hoja llamada: `RAC`
- Tabla llamada: `TablaRAC`
- Columnas en orden:
  `ID | Fecha | Hora | Tipo | Riesgo | Lugar | Descripción | Responsable | FechaCierre | Estado | Observador | FotoURL`

---

## Instalar en Android

1. Abrir Chrome en el celular
2. Navegar a la URL de la app
3. Menú (⋮) → **"Agregar a pantalla de inicio"**
4. La app aparece como ícono nativo

---

## Modo Demo

Si abres la app sin configurar Azure AD, puedes probar el modo demo con datos de ejemplo. No guarda en OneDrive.

---

## Tecnologías

- HTML/CSS/JS puro (sin frameworks)
- Microsoft Graph API (OneDrive)
- MSAL.js (autenticación Microsoft)
- PWA con Service Worker (offline)
- Sin base de datos propia — todo en tu Excel de OneDrive
