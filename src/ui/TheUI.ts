import DisplayObjectContainer = egret.DisplayObjectContainer
import UIPackage = fgui.UIPackage
import {StartMenu} from './components/StartMenu'
import {GameHub} from './components/GameHub'
import NetworkMgr from '../game/NetworkMgr'
import {Main} from '../Main'

class TheUI extends DisplayObjectContainer {
    startMenu: StartMenu
    gameHub: GameHub

    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(){
        this.addChild(fgui.GRoot.inst.displayObject)
        UIPackage.addPackage('UI')
        this.startMenu = new StartMenu()
        this.gameHub = new GameHub()
    }

    update() {
        this.gameHub.update()
    }

    //Handle Action
    async startGame() {
        await NetworkMgr.connect()
        this.startMenu.ref.visible = false
        this.gameHub.ref.visible = true
        console.log('start')
    }

    async gameOver() {
        this.startMenu.showGameOver()
        await NetworkMgr.disconnect()
        Main.reset()
    }
}

export default new TheUI()