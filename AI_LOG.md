(Modelo ia automatico %10 GPT Claude Gemini)
[Prompt] 
Edita el routes/Coleccion para que funcione este nuevo modelo de colecciones, date cuenta que este archivo es una copia del Route por lo tanto lo tienes que editar entero para que el swagger salga bien. Tambien añade este nuevo schema al joi. Valida tambien que desde models services controllers de coleccion.ts esta bien y funcione como se espera

[Resultado]
Ha modificado coherentemente el routes/coleccion.ts, haciendo que el swagger despues se contruya bien. Despues ha modificado el library/Joi añadiendo los schemas de validacion y ha añadido las funciones correspondientes en el middleware de joi. Finalmente ha repasado mis archivos que ya habia creado, y ha movido validaciones de ids que habia introducido yo a funciones separadas para tener mas limpio el codigo, esto en el controler. Y ha ajustado un poco el service frente a errores. 

[Errores] 
Se ha equivocado haciendo un populate a route_ids, no le he pedido eso, simplemente quiero que exista una relacion entre las ids referenciadas a rutas pero sin populate.

[Prompt]
Eliminar timeStamp al crear una nueva coleccion.

[Respuesta]
Ha hecho unos minicambios en el model para setear a false el timestamp