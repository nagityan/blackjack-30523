
import { Number } from './card.js'
// import { Number } from './request.js'



document.addEventListener("DOMContentLoaded", function(){

const test = new Number();
const total_p = document.getElementById("total_p")
const total_c = document.getElementById("total_c")
const btn_draw =　document.getElementById("btn_draw")
const btn_pass =　document.getElementById("btn_pass")
const bet = document.getElementById("bet")
var   point = document.getElementById("point")
const all = document.getElementById("all")
const set_1 = document.getElementById("card_1");
const set_2 = document.getElementById("card_2");
const set_3 = document.getElementById("card_3");
const set_4 = document.getElementById("card_4")
const cards_p = document.getElementById("board_p")
const cards_c = document.getElementById("board_c")
const back = document.querySelectorAll(".back")
const back_4 = document.getElementsByClassName("back_4")


all.addEventListener("click",()=>{
  bet.value = point.value
})


//playerがカードを引くアクション
const hiku = ()=>{

  const newcard = document.createElement("div")
  newcard.setAttribute("id","card_p")
  const card_front = document.createElement("div")
  card_front.setAttribute("class","front")
  const card_back = document.createElement("div")
  card_back.setAttribute("class","back")
  newcard.appendChild(card_front)
  newcard.appendChild(card_back)
  cards_p.appendChild(newcard);
  card_front.innerHTML = test.get_number_p()
  start()
  
  function sleep(msec) {
    return new Promise(function(resolve) {
      setTimeout(function() {resolve()}, msec);
    })
  }

  async function start() {
    btn_draw.removeEventListener("click", hiku)
    await sleep(700);
    const back = document.getElementsByClassName("back")
    back[back.length - 1].style.transform = 'rotateY(180deg)';
    const front = document.getElementsByClassName("front")
    front[front.length - 1].style.transform = 'rotateY(0)';
    total_p.innerText = test.cards_sum_p()
    btn_draw.addEventListener("click", hiku)
      if (total_p.textContent >= 22){
        total_p.innerText =`Burstしました(合計:${total_p.textContent})あなたの負けです。`
        btn_draw.removeEventListener("click", hiku)
        btn_pass.removeEventListener("click", pass)
        point_request()
        if (point.value == 0){
          const debt = document.getElementById("debt").style.display="block"
        }
      }
  }
    
  

}


//passを押してcpuに受け渡すアクション
const pass = ()=>{
  btn_draw.removeEventListener("click", hiku)
console.log("相手がカードをopenしました。")

//裏の初期カードをopenする
set_4.innerHTML = test.get_number_c()
total_c.innerText = test.cards_sum_c()

back_4[0].style.transform = 'rotateY(180deg)';
set_4.style.transform = 'rotateY(0)';
btn_pass.removeEventListener("click", pass)

  //17以上かoverするまで引き続ける。
    function sleep(msec) {
      return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, msec);
      })
    }

    async function start() {
    
    if (total_c.textContent <=21){
      await sleep(1500);
      const newcard = document.createElement("div")
      newcard.setAttribute("id","card_c")
      const card_front_c = document.createElement("div")
      card_front_c.setAttribute("class","front_c")
      const card_back_c = document.createElement("div")
      card_back_c.setAttribute("class","back_c")
      newcard.appendChild(card_front_c)
      newcard.appendChild(card_back_c)
      cards_c.appendChild(newcard);
      card_front_c.innerHTML = test.get_number_c()
      await sleep(700);
      console.log("Ok")
      const back = document.getElementsByClassName("back_c")
      back[back.length - 1].style.transform = 'rotateY(180deg)';
      // console.log(back)
      const front = document.getElementsByClassName("front_c")
      front[front.length - 1].style.transform = 'rotateY(0)';
      // console.log(front)
      total_c.innerText = test.cards_sum_c() 

      if (total_c.textContent >= 22){
        total_c.innerText =`CPUはBurstしました(合計:${total_c.textContent})あなたの勝ちです。`
        point.value = parseInt(point.value) + parseInt(bet.value * 2)
        point_request()
        next.addEventListener("click", next_game)
        next.style.backgroundColor="#f26964"
      }
      else{
        start()
      }

    }
    else{
      //両者Burstしなかった時の勝敗
      if(test.cards_sum_c() < test.cards_sum_p()){
        console.log("あなたの勝ちです。")
        point.value = parseInt(point.value) + parseInt(bet.value * 2)
        point_request()
        next.addEventListener("click", next_game)
      }
      else if(test.cards_sum_c() == test.cards_sum_p()){
        console.log("引き分けです")
        point.value = parseInt(point.value) + parseInt(bet.value)
      }
      else {
        console.log("あなたの負けです。")
        point_request()
        if (point.value == 0){
          const debt = document.getElementById("debt").style.display="block"
        }
      }
    }
  }
    start()
}

//開始ボタン
const start = document.getElementById("start")
start.addEventListener("click", start_card)
  
  function start_card(e) {
    //持っているポイント以上のBetはできない
    if (bet.value>point.value || bet.value == "" ||bet.value == 0){
      e.preventDefault()
    }
    

    else{
  
    bet.readOnly = true;
    
    set_1.innerHTML = test.get_number_p();
    set_2.innerHTML = test.get_number_p();
    set_3.innerHTML = test.get_number_c();
    
    flip_the_card()
   
    total_p.innerText = test.cards_sum_p();
    total_c.innerText = test.cards_sum_c();
    btn_draw.addEventListener("click", hiku);
    btn_pass.addEventListener("click", pass);
    start.removeEventListener("click", start_card)
    start.style.backgroundColor="#b64e4b"

    
    var remain = (point.value - bet.value)
    point.value = remain
   
    all.style.backgroundColor="#b64e4b"
    btn_draw.style.backgroundColor="#88a543"
    btn_pass.style.backgroundColor="#88a543"
  }
  
 
  }

  const next = document.getElementById("next")
  next.removeEventListener("click", next_game)
  next.style.backgroundColor="#b64e4b"

  //次のゲームのため、リセットを行う
  function next_game() {
    bet.readOnly = false;
    set_1.innerHTML = ""
    set_2.innerHTML = ""
    set_3.innerHTML = ""
    set_4.innerHTML = ""
    total_p.innerHTML = "合計:"
    total_c.innerHTML = "合計:"
    turn_the_car_over()
    back_4[0].style.transform = 'rotateY(0)';
    set_4.style.transform = 'rotateY(180deg)';

    var delete_card = document.querySelectorAll("#card_p,#card_c")
    console.log(delete_card)
    if (delete_card){
      delete_card.forEach(function(list) {
        list.remove()
      })
    }
  //カードを山札に戻す
    test.reset_card()
    start.addEventListener("click", start_card)
    start.style.backgroundColor="#f26964"
    all.style.backgroundColor="#f26964"
  }

  //ポイント送信
  function point_request(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/points",true);
    const json = {
      "point": point.value 
    }
    var jsonText = JSON.stringify(json)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonText);
  }

  //カードを表にする
    function flip_the_card(){
    
    back.forEach(function(card) {
      card.style.transform = 'rotateY(180deg)';
    })
    set_1.style.transform = 'rotateY(0)';
    set_2.style.transform = 'rotateY(0)';
    set_3.style.transform = 'rotateY(0)';
  }
  //カードを裏返しにする
  function turn_the_car_over(){
    back.forEach(function(card) {
      card.style.transform = 'rotateY(0)';
    })
    set_1.style.transform = 'rotateY(180deg)';
    set_2.style.transform = 'rotateY(180deg)';
    set_3.style.transform = 'rotateY(180deg)';
    
  }

  //ポイント0の時にボタン表示
if (point.value == 0){
  const debt = document.getElementById("debt").style.display="block"
}
  


  
})