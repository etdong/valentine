export default function makePresent(k, posVec2) {
    const prop = k.add([
        k.sprite('present'),
        k.anchor('topleft'),
        k.scale(0.5),
        k.area(),
        k.body({ isStatic: true} ),
        k.pos(posVec2),
        k.layer('game'),
        "present",
    ]);
    

    return prop;
}