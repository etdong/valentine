/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 * @param {vec2} posVec2 
 * @param {String} tag 
 * @param {String} label_side 
 * @returns 
 */
export default function makeDoor(k, posVec2, tag, label_side = 'left') {
    const label_text = tag.split('-')[0]
    let label_anchor = 'left'
    let label_offset = 0
    if (label_side == 'left') {
        label_anchor = 'right'
        label_offset = 10
    } else {
        label_offset = -20
    }
    const label = k.add([
        k.pos(posVec2.sub(k.vec2(label_offset, -45))),
        k.anchor(label_anchor),
        k.color('000000'),
        k.text(label_text, {
            font: 'gaegu',
            color: '000000',
            size: 32
        })
    ])
    const door = k.add([
        k.rect(10, 100),
        k.outline(4),
        k.area(),
        k.body({ isStatic: true }),
        k.pos(posVec2),
        k.layer('fg'),
        tag
    ]);

    return (label, door)
}