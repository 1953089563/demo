import Phaser from "phaser";
import {
    mainGame
} from "./main_game";
const game_config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    parent: "mainArea",
    dom: {
        createContainer: true
    },
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [mainGame]
};

const game = new Phaser.Game(game_config);