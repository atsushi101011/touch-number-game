'use strict';

{
  class  Panel {
    constructor(game) {
      this.game =game;
      this.el =document.createElement("li");  //要素liを追加
      this.el.classList.add("pressed");　　　//el(=li)にクラスpressedを追加
      this.el.addEventListener("click", ()=>{
        this.check();
    　});
  　}
    
    getEl(){
      return this.el;
    }

    activate(num){
      this.el.classList.remove("pressed");　　
      this.el.textContent = num;
    }

    check(){
      if (this.game.getCurrentNum() === parseInt(this.el.textContent,10)){  //parseInt＝文字列のel.textContentを整数に変換する、10進数
        this.el.classList.add("pressed");
        this.game.addCurrentNum();

        if(this.game.getCurrentNum() === this.game.getLevel() **2){
          clearTimeout(this.game.getTimeoutId());    //タイムを止める
        }
      }
    }
  }

  class Board {     //class=設計図
    constructor(game) {　
      this.game = game;　　　//インスタンスを生成するための機能
      this.panels = [];
      for (let i = 0; i<this.game.getLevel() **2 ;i++){
        this.panels.push(new Panel(this.game));　　　　//pushで、panelsの配列に要素を追加する
      }
      this.setup();
    }

  　　setup(){
    　　　const board = document.getElementById("board");　　//htmlのidのboardを取得
    　　　this.panels.forEach(panel => {
      　　board.appendChild(panel.getEl());　　　　　//boardにelを追加(つまりliを追加)、それをforeachでループ
    　    });
     }

    activate(){
      const nums = [];
      for (let i = 0; i<this.game.getLevel() **2 ;i++){
        nums.push(i);
      } 

      this.panels.forEach(panel => {           //一つずつ数字入れる
        const num =nums.splice(Math.floor(Math.random() * nums.length),1)[0]; //ランダムにnumsから数字を取る
        panel.activate(num);                                                  //spliceメソッド=新しい要素を追加　Math.floor=小数点以下切り捨て　Math.random=0から１でランダム
      });
    }
  }

  class Game{
    constructor(level){
      this.level =level;
      this.board = new Board(this);   //クラスから生成したオブジェクトを「インスタンス」という
      this.currentNum=undefined;
      this.startTime=undefined;
      this.timeoutId=undefined;
      const btn = document.getElementById("btn");
      btn.addEventListener("click", ()=>{     //START押したら
        this.start();　　　　　
      });
      this.setup();
  }

  setup(){
    const container = document.getElementById("container");
    const PANEL_WIDTH =50;
    const BOARD_PADDING = 10;
    container.style.width =PANEL_WIDTH * this.level + BOARD_PADDING * 2 + "px";
  }

  start(){
    if(typeof this.timeoutId !== "undefined"){
      clearTimeout(this.timeoutId);
    }
    this.currentNum = 0;
    this.board.activate();　　　　
    this.startTime = Date.now();    // Date.now  1970年からの現在のms時間
    this.runTimer();　　　

  }
   runTimer(){
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - this.startTime)/1000).toFixed(2);   //Date.now() - startTimeで、何秒経ったかわかる  小数第二位
    this.timeoutId = setTimeout(() =>{   //指定した時間が経過した後に動作開始
      this.runTimer();
    },10);
  }

  addCurrentNum(){
    this.currentNum++;
  }
  getCurrentNum(){
    return this.currentNum;
  }
  getTimeoutId(){
    return this.timeoutId;
  }
  getLevel(){
    return this.level;
  }

  }
  new Game(5);
  }
