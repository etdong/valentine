export default function makeProp(k, posVec2, sprite, layer, tag = "") {
    const prop = k.add([
        k.sprite(sprite),
        k.anchor('topleft'),
        k.scale(1),
        k.area(),
        k.body({ isStatic: true} ),
        k.pos(posVec2),
        k.layer(layer),
        tag,
    ]);
    

    return prop;
}
