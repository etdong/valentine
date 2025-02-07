import initMuteButton from "./components/MuteButton";
import makeKaplayCtx from "./kaplayCtx";
import initBedroom from "./scenes/Bedroom";
import initHallway from "./scenes/Hallway";

export default async function initGame() {

    // create kaplay context and define layers
    const k = makeKaplayCtx();
    k.setLayers(["bg", "game", "fg"], "game")
    
    // fonts
    k.loadFont('gaegu', './fonts/Gaegu-Regular.ttf')

    // sprites
    k.loadSprite('player', './sprites/player_sheet.png', {
        sliceX: 2,
        sliceY: 5,
        anims: {
            "left": { from: 2, to: 3, loop: true },
            "right": { from: 0, to: 1, loop: true },
            "down": { from: 4, to: 5, loop: true },
            "up": { from: 6, to: 7, loop: true },
            'left-idle': 3,
            'right-idle': 1,
            "down-idle": 8,
            "up-idle": 9,
        },
    });
    k.loadSprite('bed', './furniture/bed.png');
    k.loadSprite('table', './furniture/table.png');
    k.loadSprite('window', './furniture/window.png');
    k.loadSprite('dresser', './furniture/dresser.png');
    k.loadSprite('laundry', './sprites/laundry.png')
    k.loadSprite('stairs', './images/stairs.png')
    k.loadSprite('sound_unmuted', './images/sound_unmuted.png')
    k.loadSprite('sound_muted', './images/sound_muted.png')

    // sounds
    k.loadSound('bedroom_bgm', './sounds/bedroom_bgm.mp3')


    // camera zoom initialization
    const setInitCamZoom = () => {
        if (k.width() < 1000) {
            k.setCamScale(0.7, 0.7);
            return;
        }

        k.setCamScale(1, 1);
    }

    setInitCamZoom();

    // scene initialization
    initBedroom(k)
    initHallway(k)

    // starting game!!
    // k.go('bedroom', k.center())
    k.go('hallway', k.center().add(k.vec2(50, 0)))
    k.play('bedroom_bgm', {
            volume: 0.5,
            loop: true,
        })
}