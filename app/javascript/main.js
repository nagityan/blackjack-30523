
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
const triangle_left = document.getElementById("triangle_left")
const triangle_right = document.getElementById("triangle_right")
const set_1 = document.getElementById("card_1");
const set_2 = document.getElementById("card_2");
const set_3 = document.getElementById("card_3");
const set_4 = document.getElementById("card_4")
const cards_p = document.getElementById("board_p")
const cards_c = document.getElementById("board_c")
const back = document.querySelectorAll(".back")
const back_4 = document.getElementsByClassName("back_4")
const message = document.getElementsByClassName("message")
const win_lose = document.getElementsByClassName("win_lose")
const debt = document.getElementById("debt")
//betの設定
bet.value =parseInt(0)
const allin = ()=>{
  bet.value = point.value
}
const downbet = ()=>{
  if((parseInt(bet.value) - parseInt(point.value/10) <= 0)){
    bet.value =parseInt(0)
  }
  else{
    Math.floor(bet.value = parseInt(bet.value) - parseInt(point.value/10))
}}

const upbet = ()=>{
 
  if((parseInt(bet.value) + parseInt(point.value/10) >= point.value)){
    bet.value = point.value
  }
  else{
    Math.floor(bet.value = parseInt(bet.value) + parseInt(point.value/10))
}}

all.addEventListener("click",allin)
triangle_left.addEventListener("click",downbet)
triangle_right.addEventListener("click",upbet)


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
        total_p.innerText =`Burst(${total_p.textContent})`
        message[0].innerText =`Burstしました。あなたの負けです。`
        win_lose[0].innerHTML =`Lose`
        await sleep(500);
        win_lose[0].insertAdjacentHTML("beforeend",`.`)
        await sleep(500);
        win_lose[0].insertAdjacentHTML("beforeend",`.`)
        btn_draw.removeEventListener("click", hiku)
        btn_pass.removeEventListener("click", pass)
        point_request()
        if (point.value == 0){
          const debt = document.getElementById("debt").style.display="block"
        }
        next.addEventListener("click", next_game)
        next.style.backgroundColor="#f26964"
      }
  }
    
  

}


//passを押してcpuに受け渡すアクション
const pass = ()=>{
btn_draw.removeEventListener("click", hiku)
message[0].innerText =`相手がカードをopenします。`
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
      message[0].innerText =`相手は1枚カードを引きます。`
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
      const back = document.getElementsByClassName("back_c")
      back[back.length - 1].style.transform = 'rotateY(180deg)';
      const front = document.getElementsByClassName("front_c")
      front[front.length - 1].style.transform = 'rotateY(0)';
      
      total_c.innerText = test.cards_sum_c() 
      
      if (total_c.textContent >= 22){
        total_c.innerText =`Burst(${total_c.textContent})`
        message[0].innerText =`相手はBurstしました。 ${total_c.textContent}あなたの勝ちです。`
        point.value = parseInt(point.value) + parseInt(bet.value * 2)
        point_request()
        next.addEventListener("click", next_game)
        next.style.backgroundColor="#f26964"
        win_lose[0].innerHTML =`Win!!`
        await sleep(500);
        win_lose[0].insertAdjacentHTML("beforeend",`\n+${parseInt(bet.value * 2)}`)
        if(point.value > 5000){
          const repay = document.getElementById("repay").style.display="block"
        }
       
      }
      else{
        message[0].innerText =`考え中...`
        await sleep(2500);
        start()
      }

    }
    else{
      //両者Burstしなかった時の勝敗
      await sleep(1000);
      message[0].innerText =`相手はカードを引きませんでした。`
      await sleep(2000);
      if(test.cards_sum_c() < test.cards_sum_p()){
        message[0].innerText =`あなたの勝ちです。${total_c.textContent}対${total_p.textContent}`
        point.value = parseInt(point.value) + parseInt(bet.value * 2)
        point_request()
        next.addEventListener("click", next_game)
        next.style.backgroundColor="#f26964"
        win_lose[0].innerHTML =`Win!!`
        await sleep(500);
        win_lose[0].insertAdjacentHTML("beforeend",`\n+${parseInt(bet.value * 2)}`)
        
      }
      else if(test.cards_sum_c() == test.cards_sum_p()){
        message[0].innerText =`引き分けです。${total_c.textContent}対${total_p.textContent}`
        win_lose[0].innerHTML =`Draw`
        point.value = parseInt(point.value) + parseInt(bet.value)
        next.addEventListener("click", next_game)
        next.style.backgroundColor="#f26964"
        
      }
      else {
        message[0].innerText =`あなたの負けです。${total_c.textContent}対${total_p.textContent}`
        point_request()
        win_lose[0].innerHTML =`Lose`
        await sleep(800);
        win_lose[0].insertAdjacentHTML("beforeend",`.`)
        await sleep(800);
        win_lose[0].insertAdjacentHTML("beforeend",`.`)

        if (point.value == 0){
          const debt = document.getElementById("debt").style.display="block"
        }
        else if(point.value > 5000){
          const repay = document.getElementById("repay").style.display="block"
        }
        else{
          next.addEventListener("click", next_game)
          next.style.backgroundColor="#f26964"
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
    all.removeEventListener("click",allin)
    triangle_left.removeEventListener("click",downbet)
    triangle_right.removeEventListener("click",upbet)
    message[0].innerText =`DrawかPassを選択してください。`
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
    btn_draw.style.backgroundColor="#b3bd32"
    btn_pass.style.backgroundColor="#b3bd32"
  }
  
 
  }

  const next = document.getElementById("next")
  next.removeEventListener("click", next_game)
  next.style.backgroundColor="#b64e4b"

  //次のゲームのため、リセットを行う
  function next_game() {
    
    bet.readOnly = false;
    bet.value = parseInt(bet.value)
    set_1.innerHTML = ""
    set_2.innerHTML = ""
    set_3.innerHTML = ""
    set_4.innerHTML = ""
    total_p.innerHTML = ""
    total_c.innerHTML = ""
    win_lose[0].innerHTML =``
    turn_the_car_over()
    back_4[0].style.transform = 'rotateY(0)';
    set_4.style.transform = 'rotateY(180deg)';

    var delete_card = document.querySelectorAll("#card_p,#card_c")
    if (delete_card){
      delete_card.forEach(function(list) {
        list.remove()
      })
    }
  //カードを山札に戻す
    test.reset_card()
    start.addEventListener("click", start_card)
    all.addEventListener("click", allin)
    start.style.backgroundColor="#f26964"
    all.style.backgroundColor="#f26964"
    message[0].innerText =`Betを決めて、Startボタンで開始します。`


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
  

//モーダルウインドウを開く
const modal = document.getElementById("modal")
debt.addEventListener('click', function(){
	// var target= $(this).attr('href');
	// $('#modal_inner'.html($(target).html());
  modal.classList.add('__open')
});

const repay = document.getElementById("repay")
const modal_2 = document.getElementById("modal_2")
repay.addEventListener('click', function(){
	// var target= $(this).attr('href');
	// $('#modal_inner'.html($(target).html());
  modal_2.classList.add('__open')
});



//モーダルウインドウを閉じる
modal.addEventListener('click', function(){
	modal.classList.remove('__open')
});

modal_2.addEventListener('click', function(){
	modal_2.classList.remove('__open')
});




  
})