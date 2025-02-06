
export default function makeRoom(k, width, height, wallThickness, center) {
    const top_wall = k.add([
        k.rect(width + wallThickness * 2, wallThickness),
        k.anchor('center'),
        k.pos(center.x, center.y - height / 2 - wallThickness / 2),
        k.color(0, 0, 0),
        k.area(),
        k.body({isStatic: true}),
        k.layer('bg'),
        "wall"
    ]);

    const bottom_wall = k.add([
        k.rect(width + wallThickness * 2, wallThickness),
        k.anchor('center'),
        k.pos(center.x, center.y + height / 2 + wallThickness / 2),
        k.color(0, 0, 0),
        k.area(),
        k.body({isStatic: true}),
        k.layer('bg'),
        "wall"
    ]);

    // eslint-disable-next-line no-unused-vars
    const right_wall = k.add([
        k.rect(wallThickness, height),
        k.anchor('center'),
        k.pos(center.x + width / 2 + wallThickness / 2, center.y),
        k.color(0, 0, 0),
        k.area(),
        k.body({isStatic: true}),
        k.layer('bg'),
        "wall"
    ]);

    const left_wall = k.add([
        k.rect(wallThickness, height),
        k.anchor('center'),
        k.pos(center.x - width / 2 - wallThickness / 2, center.y),
        k.color(0, 0, 0),
        k.area(),
        k.body({isStatic: true}),
        k.layer('bg'),
        "wall"
    ]);

    return(top_wall, bottom_wall. right_wall, left_wall);
}