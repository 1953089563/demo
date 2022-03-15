import { CapacitorUpdater } from 'capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const updateNow = async () => {
    console.log('开始更新2.0.0');
    const version = await CapacitorUpdater.download({
        // url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.2/dist.zip',
        // url: 'http://192.168.1.61/capacitor/download/2.0.0/dist.zip'  // 本地服务器下载失败
        url: 'https://github.com/1953089563/demo/releases/download/v2.0.0/dist.zip'
    }).catch((err) => {
        console.log('更新v2.0.0 err', err);
        CapacitorUpdater.reset();
    })
    CapacitorUpdater.addListener('download', (info) => {
        console.log('process v2.0.0', info.percent);
    });
    console.log('CapacitorUpdater', CapacitorUpdater);

    console.log('version', version);
    if (version == undefined) return;
    // show the splashscreen to let the update happen
    SplashScreen.show()
    await CapacitorUpdater.set(version).catch((err) => {
        console.log('切换v2.0.0版本失败', err);
        CapacitorUpdater.reset();
    })
    SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}

const getList = async () => {
    console.log('获取所有可用版本');
    const list = await CapacitorUpdater.list();
    console.log('list', list);
}
const getCurrent = async () => {
    console.log('获取当前版本');
    const current = await CapacitorUpdater.current();
    console.log('current', current);
}
const versionNameFun = async () => {
    console.log('获取version name');
    const versionName = await CapacitorUpdater.versionName();
    console.log('versionName', versionName);
}
const requireAll = context => context.keys().map(context);
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
    }
    create() {
        const scene = this;
        this.add.text(1024 / 2, 100, 'apacitor-updater 1.7.0').setOrigin(0.5);

        // const btn = scene.add.container(1024 / 2, 300);
        // const rect = scene.add.rectangle(0, 0, 150, 100, 0xfff, 0.5);
        // const text = this.add.text(0, 0, 'update v2.0.0').setOrigin(0.5);
        // btn.add([rect, text])
        // btn.setSize(150, 100).setInteractive({
        //     useHandCursor: true
        // });
        const btn = scene.addButton(1024 / 2, 300, 'update v2.0.0');
        btn.on('pointerup', function () {
            updateNow();
        })

        scene.add.image(1024 / 2, 500, 'img_002.jpg')


        const listBtn = scene.addButton(100, 200, 'get all version');
        listBtn.on('pointerup', function () {
            getList();
        })

        const currentBtn = scene.addButton(100, 300, 'get current version');
        currentBtn.on('pointerup', function () {
            getCurrent();
        })

        const versionNameBtn = scene.addButton(100, 400, 'version name');
        versionNameBtn.on('pointerup', function () {
            versionNameFun();
        })
    }

    addButton(x, y, str) {
        const scene = this;
        const btn = scene.add.container(x, y);
        const text = this.add.text(0, 0, str).setOrigin(0.5);
        const rect = scene.add.rectangle(0, 0, text.width + 30, 50, 0xfff, 0.5);
        btn.add([rect, text])
        btn.setSize(150, 100).setInteractive({
            useHandCursor: true
        });
        return btn;
    }
}


