import { CapacitorUpdater } from 'capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const updateNow = async () => {
    console.log('开始更新2');
    const version = await CapacitorUpdater.download({
        // url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
        url: 'http://192.168.1.61/capacitor/download/2.0.0/dist.zip'
    })
    console.log('version', version);
    // show the splashscreen to let the update happen
    SplashScreen.show()
    await CapacitorUpdater.set(version)
    SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}

export class mainGame extends Phaser.Scene {
    constructor() {
        super({
            key: "MAINGAME",
        });
    }
    preload() {
    }
    create() {
        const scene = this;
        this.add.text(1024 / 2, 100, 'apacitor-updater 1.0.0').setOrigin(0.5);

        const btn = scene.add.container(1024 / 2, 300);
        const rect = scene.add.rectangle(0, 0, 100, 100, 0xfff, 0.5);
        const text = this.add.text(0, 0, 'update').setOrigin(0.5);
        btn.add([rect, text])
        btn.setSize(100, 100).setInteractive({
            useHandCursor: true
        });
        btn.on('pointerup', function () {
            updateNow();
        })
    }
}


