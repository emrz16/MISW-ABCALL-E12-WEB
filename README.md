# Proyecto grupo 12 ABCall

## Sobre el equipo

## Integrantes
| Nombre  | Correo                | Usuario github              | 
|---------|-----------------------| --------------------------- | 
| Emmanuel Rodriguez    | e.rodriguezz@uniandes.edu.co      | emrz16 |
| Ines Rojas   | ia.rojas2@uniandes.edu.co    | leinaro |
| Dario Rios | jd.rios2@uniandes.edu.co    | daRios07 |
| Andres Soler   | a.solerf@uniandes.edu.co     | andsoler0309 |


## Metodología de trabajo
Scrum

## Ramas
Nombre rama | Propósito
-- | --
 **`main`**|  Rama principal del proyecto. Esta rama contiene el paquete de funcionalidades entregadas al cliente. Contiene cada una de las versiones del producto.
**`develop`**| Rama donde se integrarán las nuevas funcionalidades del producto.
`feature/HUXXX-<<descripción>>` | Rama temporal creada para implementar nuevos cambios o re-factorizaciones asociadas a una nueva funcionalidad del sistema de acuerdo a las historias de usuario solicitadas. **Esta deberá ser creada desde la rama "develop" e integrada a la misma**.
`hotfix/HUXXX-<<descripción>>` | Rama creada para realizar correcciones de errores que pudieron llegar a la rama principal. Se asociará el número de la historia y una pequeña descripción. Esta deberá ser creada desde la rama "main". Los cambios reflejados aquí deberán ser mezclados nuevamente a la rama "main" y a la rama "develop" para asegurarse de que el error esté corregido y los cambios se vean reflejados en las ramas principales del repositorio.
`release/X.Y.Z` | Rama creada para integrar los cambios realizados para un conjunto de funcionalidades nuevas desarrolladas en la semana de iteración. Esta rama se fusionará con "main". |
|| * La primera cifra (X) indicará la versión principal del software. Cambiará cuando se agreguen nuevas funcionalidades importantes, puede ser como un nuevo modulo o característica clave para la funcionalidad.
|| * La segunda cifra (Y) indicará nuevas funcionalidades. Cambiará cuando se realicen correcciones menores, se arregle un error y/o se agreguen funcionalidades que no son cruciales para el proyecto.
|| * La tercera cifra (Z) indicará que se hizo una revisión del código por algún fallo. Cambiará cuando se arregle algún error o problema encontrado (bug)

## Estrategia de git
Git flow
![355229748-00efaca3-d8df-457d-ba20-c3a7f1801d08](https://github.com/user-attachments/assets/78a0c59b-4e54-4f50-b43e-6994adfe977c)



# Proyecto Abcall Aplicacion Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

