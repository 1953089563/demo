import { CapacitorUpdater } from 'capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const updateNow = async () => {
    console.log('开始更新2');
    const version = await CapacitorUpdater.download({
        // url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
        // url: 'http://192.168.1.61/capacitor/download/2.0.0/dist.zip'  // 本地服务器下载失败
        url: 'https://github.com/1953089563/demo/releases/download/v2.0.0/dist.zip'
    })
    console.log('version', version);
    // show the splashscreen to let the update happen
    SplashScreen.show()
    await CapacitorUpdater.set(version)
    SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}
const requireAll = context => context.keys().map(context);
// const cmyk = require.context('../assets/img_cmyk/', false, /\.jpg$/);
const rgb = require.context('../assets/', false, /\.jpg$/);

export class mainGame extends Phaser.Scene {
    constructor() {
        super({
            key: "MAINGAME",
        });
    }
    preload() {
        const scene = this;
        requireAll(rgb).forEach((item, index) => {
            this.load.image(rgb.keys()[index].split('/')[1], item.default)
        });

        console.log('sc', scene);

    }
    create() {
        const scene = this;
        this.add.text(1024 / 2, 100, 'apacitor-updater 1.0.0').setOrigin(0.5);

        const btn = scene.add.container(1024 / 2, 300);
        const rect = scene.add.rectangle(0, 0, 150, 100, 0xfff, 0.5);
        const text = this.add.text(0, 0, 'update v1.0.0').setOrigin(0.5);
        btn.add([rect, text])
        btn.setSize(150, 100).setInteractive({
            useHandCursor: true
        });
        btn.on('pointerup', function () {
            updateNow();
        })

        scene.add.image(1024 / 2, 500, 'img_002.jpg')
    }
}


