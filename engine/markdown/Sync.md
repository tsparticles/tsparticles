# Sync

**tsParticles** Boolean values (`true` and `false`) are the only possible inputs for this property.

The `sync` property determines whether an effect is to be applied to all particles concurrently or from the moment they are generated.

## life
`sync` values are possible for `life.delay` and `life.duration`:

`life.delay`
When `sync` is toggled as `true` for `life.delay`, all particles appear at the same time when the browser loads the page.  When `sync` is toggled as `false`, particles appear with the `life.delay` value specified.  In the example below, `sync` is toggled `true` and all particles appear after a few seconds' delay.

```javascript
life{
  delay{
    value: 3
    sync: true
    }
  }
}
```

`life.duration`
When `sync` is toggled as `true` for `life.duration`, the particle durations will be coordinated with one another.  In other words, they will all appear and disappear at the same time. In the following example, all particles will persist for a few seconds before disappearing.  With `sync` toggled as `false` each particle that is generated will appear and disappear three seconds after generation.

```javascript
life{
  duration{
    value: 3
    sync: true
    }
  }
}
```

## .animation
The following properties accept `sync` values with .animation:

`color.animation`, `opacity.animation`, `orbit.animation`, `rotate.animation`, `size.animation`, and `tilt.animation`.

In the following example, when `sync` is toggled `true`, particles generated will rotate in time with each other for their entire duration. However, when `sync` is toggled `false`, particles generated begin turning at the set speed from their time of appearance, but independently of one another. 

```javascript
rotate{
  animation{
    enable: true
    speed: 5
    sync: true
  }
}
```

## A Note on Errors
In cases where invalid values are inputted for a property the default value will appear synced across all animations.

For example will display as black offsetted at this default value across all particles: 

```javascript
color{
    value: #1ec523ff
    animation{
      h{
        count:0
        enable: true
        offset: foo
        speed: 5
        sync: true
      }
    }
}
```