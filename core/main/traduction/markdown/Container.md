# Contenedor de Partículas

La clase {@link Container} es el manejador de la instancia entera tsParticles. Si obtienes un resultado de {@link MainSlim.load | tsParticles.load} el resultado es esta clase. En {@link MainSlim.loadJSON | tsParticles.loadJSON} es el parámetro `then`.

De otro modo, puedes obtener cualquier instancia cargada utilizando {@link MainSlim.dom | tsParticles.dom()} o {@link MainSlim.domItem | tsParticles.domItem(index)}.

## Propiedades

{@link id}: el id de {@link Container}, generalmente es el elemento del DOM relacionado al atributo {@link id}. Se define por {@link MainSlim.load | tsParticles.load()} y {@link MainSlim.loadJSON | tsParticles.loadJSON()}.

{@link options}: Donde se encuentran las opciones actualmente cargadas. Cambiar estas opciones durante la reproducción puede resultar en comportamientos indefinidos. Usar {@link refresh | refresh()} después de un cambio es lo más adecuado.<br />
{@link sourceOptions}: Las opciones utilizadas cuando se creó el {@link Container}, estas opciones sólo se usarán en el constructor.

{@link particles}: El manejador de las partículas, desde aquí puedes agregar/eliminar partículas.

## Métodos

{@link play | play()}: Se usa para continuar las animaciones, puede detenerse usando {@link pause | pause()}.<br />
{@link pause | pause()}: Usado para pausar animaciones, puede ser reiniciado con {@link play | play()}.

{@link destroy | destroy()}: Prepara la instancia para su destrucción, no podrás recuperar esta instancia más adelante. Solo si tienes una variable que la referencía.

{@link exportImage | exportImage(callback, type?, quality?)}: Exporta una imagen del canvas (sin la propiedad del fondo, si está definida), `type` y `quality` son opcionales y son el tipo de imagen de salida y calidad.<br />
{@link exportConfiguration | exportConfiguration()}: Exporta la configuración actual usando JSON, regresa un string.

{@link start | start()}: Inicia el contenedor, difiere de {@link play | play()}, pues esto reiniciará todo.<br />
{@link stop | stop()}: Detiene el contenedor, difiere de {@link pause | pause()}, pues va a limpiar todo lo que debe ser reiniciado.<br />
{@link refresh | refresh()}: Reinicia el contenedor, solo es un atajo para {@link stop | stop()}/{@link start | start()}.
