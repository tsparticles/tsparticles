'use strict';

export enum ShapeType {
    circle = 'circle',
    edge = 'edge',
    triangle = 'triangle',
    polygon = 'polygon',
    star = 'star',
    image = 'image',
    square = 'square',
    heart = 'heart',
    char = 'char',
    character = 'character',
    line = "line",
}

export enum MoveDirection {
    none = 'none',
    top = 'top',
    topRight = 'top-right',
    right = 'right',
    bottomRight = 'bottom-right',
    bottom = 'bottom',
    bottomLeft = 'bottom-left',
    left = 'left',
    topLeft = 'top-left',
}

export enum OutMode {
    out = 'out',
    bounce = 'bounce',
    bounceVertical = 'bounce-vertical',
    bounceHorizontal = 'bounce-horizontal',
}

export enum InteractivityDetect {
    canvas = 'canvas',
    window = 'window',
    parent = 'parent',
}

export enum HoverMode {
    grab = 'grab',
    bubble = 'bubble',
    repulse = 'repulse',
}

export enum ClickMode {
    push = 'push',
    remove = 'remove',
    bubble = 'bubble',
    repulse = 'repulse',
}

export enum ProcessBubbleType {
    size = 'size',
    opacity = 'opacity',
}
