# Prueba Bimestral - Consumo de apis de perros, robots y libros
## Equipo de desarrollo

- [@YuverlyHidokun](https://github.com/YuverlyHidokun)




## Capturas de Pantalla 📸

### Lista de perros, robots y libros

![perros](https://github.com/YuverlyHidokun/Prueba-Bimestral-Ionic/blob/master/src/assets/imagen1.png?raw=true)

### Guardado en Firebase

![storage](https://github.com/YuverlyHidokun/Prueba-Bimestral-Ionic/blob/master/src/assets/imagen2.png?raw=true)


## Pasos para configurar el Proyecto en Ionic 

1. Crear el proyecto en IONIC:
   ```bash
   ionic start nombre_aplicacion blank --type=angular
2. Entrar en el proyecto
    ```bash
    cd nombre_aplicacion
3. Dentro de de la carpeta del proyecto
   ```bash
   npm install @angular/common @angular/http, puede que deba usar --force
3. Instalar servidores 
   ```bash
   ionic generate service services/data
4. Añadir Firebase al proyecto 
   ```bash
   ng add @angular/fire o npm install @angular/fire
## Construir APK
1. Construir apkConstruir apk
   ```bash
   ionic build
2. Añadir capacitor de android
   ```bash
   ionic cap add android
