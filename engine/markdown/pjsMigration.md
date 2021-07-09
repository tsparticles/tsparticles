# Migrating from Particles.js

tsParticles is fully compatible with Particles.js and the migration is really easy to do.

Let's checkout your possible HTML code.

## Simple solution

You should have something like the following code

```html
<script src="particles.min.js"></script>
```

Well to migrate from particles.js to tsParticles all you have to do is replace that to this

```html
<script src="tsparticles.min.js"></script>
```

If you have customized the css like this:

```css
.particles-js-canvas-element {
    /* your awesome CSS code */
}
```

You have to change it like this

```css
.tsparticles-canvas-element {
    /* your awesome CSS code */
}
```

And you're done. Easy isn't it?

## Advanced solution

Probably you noticed some warnings in the console. Well yes, it's really easy doing the migration but new features requires new configs and bug fixes can mess up some things.

If you're not familiar with Javascript don't worry, you can skip this part and keep the warnings, everything will work fine.

If you care about console warnings well you are in the right place.

The particlesJS identifier is now obsolete, well the library has a new name so it changed.

Now let's checkout the Javascript code, you should have something like this

```javascript
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
```

or something like this

```javascript
particlesJS('particles-js', { /* your options here */ });
```

All you have to do to use the new identifiers it replacing the function

`particlesJS()` into `tsParticles.load()`

or the function

`particlesJS.load()` into `tsParticles.loadJSON()`

**Warning here, the `loadJSON` doesn't have a third parameter, if you need a callback use the `then` function.**

Still really simple.

Let's convert the sample provided above to understand

```javascript
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
tsParticles.loadJSON('particles-js', 'assets/particles.json').then(function(p) {
  // p is the loaded container, for using it later
  console.log('callback - particles.js config loaded');
});

tsParticles.load('particles-js', { /* your options here */ });
```

But probably you noticed that your warnings are still there, well the options are changed too but like the identifier this is not an issue.

## Transforming Options

Let's checkout the options warning. They suggest you to change the old property in the newer one.

The changed properties still continues to work, but they will be dropped probably for new features.

If you find a property with a `_` in the name, that property was renamed. We can take `line_linked` property as sample. It's renamed `lineLinked` now.

Boom. Another warning gone!

Checkout warnings for finding all other properties renamed.
