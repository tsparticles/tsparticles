# Particles Container

The {@link Container} class is the manager of the entire tsParticles instance. If you get the result of {@link Engine.load | tsParticles.load} the result it's this class, in the {@link Engine.loadJSON | tsParticles.loadJSON} is the `then` parameter.

Otherwise you can retrieve any loaded instance using {@link Engine.dom | tsParticles.dom()} or {@link Engine.domItem | tsParticles.domItem(index)}.

## Properties

{@link Container.id}: the {@link Container} id, normally is the related DOM element {@link Container.id} attribute. It's set by {@link Engine.load | tsParticles.load()} and {@link Engine.loadJSON | tsParticles.loadJSON()}.

{@link Container.options}: Where to find the current options loaded. Changing this options while playing can result in an unexpected behavior. A {@link refresh | refresh()} after the change is the best thing to do.<br />
{@link Container.sourceOptions}: The options used when the {@link Container} was created, these options will be used only in the constructor.

{@link Container.particles}: The particles manager, you can add/remove particles from here.

## Methods

{@link Container.play | play()}: Used to resume the animations, can be stopped using {@link pause | pause()}.<br />
{@link Container.pause | pause()}: Used to pause the animations, can be restarted using {@link play | play()}.

{@link Container.destroy | destroy()}: Prepare the instance to destruction, you won't retrieve this instance anymore. Only if you have a variable set with it.

{@link Container.exportImage | exportImage(callback, type?, quality?)}: Exports an image of the canvas (without the background property if set), type and quality are optional and are the image output type and quality.<br />
{@link Container.exportConfiguration | exportConfiguration()}: Exports the current configuration in JSON, returns a string

{@link Container.start | start()}: Starts the container, it's different from {@link play | play()}, this will reload everything.<br />
{@link Container.stop | stop()}: Stops the container, it's different from {@link pause | pause()}, this will clean up what need to be reloaded.<br />
{@link Container.refresh | refresh()}: Restarts the container, just a {@link stop | stop()}/{@link start | start()} shortcut.

{@link Container.loadTheme | loadTheme(name)}: Sets the specified theme reloading options, if name is `undefined` the default theme will be used (if set)
