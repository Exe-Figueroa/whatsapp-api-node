# Creaciónd el proyecto en node
  - Se crea la estructura de carpetas 
  - Se define el punto de entrada de la app
  - Y se instalan las dependencias necesarias para correr el servidor
## 05. Crear app en Meta for Developers
  1. Iniciar sesión en meta
  2. Crear una app
    - De tipo Bussines
  3. Elegir el producto
    - ApiCloud De whatsApp
  4. Conectar con el Portfolio de nogadev
  5. Agregar número de teléfono al que se le enviará el mensaje
  6. Administrar plantillas 
     1. En detalles de plantilla tenemos toda la info de esta y la podemos configurar
     2. Se pueden crear más plantillas
     3. Se puede enviar texto directamente desde la api (texto plano harcodeado)
## 6. Enviar un mensaje de tipo plantilla
  1. Abrir postman
  2. Hacer solicitud post a la URL de whatsapp bussines
  3. Colocar el token en la sección de authorization
  4. Agregar el header que es de content type json
## 7. Generar un token permanente
  Por defecto los tokens que nos brinda whatsappBussines son válidos durante 23hs, por lo que hay que generar aun token permanente
  1. Ir a Apps
  2. Click en el link de la propiedad negocio de nuestra app
  3. Agregar usuarios
  4. Agregar activos
     1. Seleccionar el perfil
     2. Click en asignar activos
     3. Click en apps
     4. Seleccionar la app correspondiente
     5. Seleccionar la opción de administrador para tener todos los permisos
     6. Guardar cambios
  5. Desplegar opciones de la app
     1. Dar click en el usuario
     2. Clickear la app y se despliegan las opciones
     3. Y nos aseguramos de que esté la opción de administrar app marcada
  6. Generar token
     1. Seleccionar la app correspondiente
     2. Agregar los permisos de 
        - whatsapp_business_management
        - whatsapp_business_messaging
     3. Generar token
  7. Reemplazar el token por el de postman
## 8. Enviar un mensaje de tipo texto
  1. Buscar el [whatsAppCloud API postman](https://www.postman.com/meta/workspace/whatsapp-business-platform/collection/13382743-84d01ff8-4253-4720-b454-af661f36acc2): En la config de postman encontramos las configuraciones que ofrece meta para realizar solicitudes
  2. Copiar la solicitud de muestra y reemplazar los valores
     1. en To va el número de teléfono 📱
     2. En body va el mensaje que queremos enviar 
     3. Hay que responder en el chat para que se habilite el enviado de mensajes
## 9. Enviar un mensaje de tipo texto con diferentes formatos
  1. Se cambia el formato del texto como se cambia al escribir en whatsApp
## 10. Enviar un mensaje con vista previa de una Url
  1. Colocar el previewUrl en true para que se vea la preview de las urls
  2. Ingresar una url en el body
  3. Enviar mensaje
## 11. Enviar imagen, audio, documento y video
  1. Replicar la consulta anterior y asignarle el campo type
  2. En el campo type especificar que va a ser una imagen
  3. Y reemplazar text por image
  4. Eliminar los campos que tenía el text
  5. Colocar un campo link y colocar la url de la imagen
  6. Para enviar audios es lo mismo solo que se le cambia el tipo y la clave a audio
  7. Lo mismo para los documentos solo que a estos además del link se les agrega la propiedad caption que es el nombre del documento
  8. Para los videos lo mismo que el document
  9. Para el sticker es lo mismo solo que sin el caption
## 12. Enviar ubicación
  1. Se crea una solicitud de tipo location
  2. En la estructura del Location se asignan la altitud, la longitud, el nombre y la dirección