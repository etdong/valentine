export default function makeProp(k, posVec2, sprite, layer, anchor = "topleft", tag = "") {
    const prop = k.add([
        k.sprite(sprite),
        k.anchor(anchor),
        k.scale(1),
        k.area(),
        k.body({ isStatic: true} ),
        k.pos(posVec2),
        k.layer(layer),
        tag,
    ]);
    

    return prop;
}
