export default function makePlayer(k, posVec2, speed) {
    const player = k.add([
        k.sprite('player', { anim: "down-idle" }),
        k.scale(8),
        k.anchor('bot'),
        k.area({ shape: new k.Rect(k.vec2(0), 6, 2)}),
        k.body(),
        k.pos(posVec2),
        k.layer('fg'),
        'player',
        {
            direction: "down",
            dir_vec: k.vec2(0, 0),
            rec_coll: null,
        }
    ]);

    k.onKeyDown(['w', 'up'], () => {
        player.dir_vec = k.vec2(0, -1)
        player.move(k.vec2(0, -1).scale(speed))
        player.direction = "up"
    });
    k.onKeyDown(['a', 'left'], () => {
        player.dir_vec = k.vec2(-1, 0)
        player.move(k.vec2(-1, 0).scale(speed))
        player.direction = "left"
    });
    k.onKeyDown(['s', 'down'], () => {
        player.dir_vec = k.vec2(0, 1)
        player.move(k.vec2(0, 1).scale(speed))
        player.direction = "down"
    })
    k.onKeyDown(['d', 'right'], () => {
        player.dir_vec = k.vec2(1, 0)
        player.move(k.vec2(1, 0).scale(speed))
        player.direction = "right"
    });

    player.onCollide((object) => {
        player.rec_coll = object
    })

    player.onUpdate(() => {
        if (!k.getCamPos().eq(player.pos)) {
            k.tween(
                k.getCamPos(),
                player.pos,
                0.1,
                (newPos) => k.setCamPos(newPos),
                k.easings.linear
            )
        }
        let objs = player.getCollisions()

        if (objs.length != 0) {
            for (let i = 0; i < objs.length; i++) {
                let counter_movement = k.vec2(objs[i].normal.x, objs[i].normal.y * - 1)
                player.move(counter_movement)
            }
        }

        if (!k.isKeyDown()) {
            player.direction = player.direction + '-idle'
        }

        switch (player.direction) {
            case 'up':
                if (!player.getCurAnim().name.includes('up') || player.getCurAnim().name.includes('idle')) {
                    player.play('up', { speed: 6 })
                }
                break
            case 'down':
                if (!player.getCurAnim().name.includes('down') || player.getCurAnim().name.includes('idle')) {
                    player.play('down', { speed: 6 })
                }
                break
            case 'left':
                if (!player.getCurAnim().name.includes('left') || player.getCurAnim().name.includes('idle')) {
                    player.play('left', { speed: 6 })
                }
                break
            case 'right':
                if (!player.getCurAnim().name.includes('right') || player.getCurAnim().name.includes('idle')) {
                    player.play('right', { speed: 6 })
                }
                break
            case 'down-idle':
                if (!player.getCurAnim().name.includes('down-idle')) {
                    player.play('down-idle')
                }
                break
            case 'up-idle':
                if (!player.getCurAnim().name.includes('up-idle')) {
                    player.play('up-idle')
                }
                break
            case 'left-idle':
                if (!player.getCurAnim().name.includes('left-idle')) {
                    player.play('left-idle')
                }
                break
            case 'right-idle':
                if (!player.getCurAnim().name.includes('right-idle')) {
                    player.play('right-idle')
                }
                break
        }
    });
    

    return player;
}

export function checkProximity(objA, objB) {
    // Get positions and dimensions of the objects
    const posA = objA.pos;
    const posB = objB.pos;
    const widthA = objA.width;
    const heightA = objA.height;
    const widthB = objB.width;
    const heightB = objB.height;

    // Calculate the distances between all pairs of borders
    const distances = [
      posB.x - (posA.x + widthA), // Object A's right to Object B's left
      posA.x - widthA - (posB.x + widthB), // Object A's left to Object B's right
      posB.y - (posA.y + heightA), // Object A's bottom to Object B's top
      posA.y - (posB.y + heightB), // Object A's top to Object B's bottom
    ];

    // Find the minimum distance
    let minDistance = Infinity;
    
    for (const distance of Object.entries(distances)) {
      if (Math.abs(distance[1]) < minDistance) {
        minDistance = Math.abs(distance[1]);
      }
    }

    return minDistance
}
