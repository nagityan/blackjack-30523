
import { Number } from './card.js'



document.addEventListener("DOMContentLoaded", function(){

 
const test = new Number();
const total_p = document.getElementById("total_p")
const total_c = document.getElementById("total_c")
const btn_draw =　document.getElementById("btn_draw")
const btn_pass =　document.getElementById("btn_pass")
const bet = document.getElementById("bet")
const point = document.getElementById("point")
const all = document.getElementById("all")
const set_1 = document.getElementById("card_1");
const set_2 = document.getElementById("card_2");
const set_3 = document.getElementById("card_3");
const set_4 = document.getElementById("card_4")

const cards_p = document.getElementById("board_p")
const cards_c = document.getElementById("board_c")




point.value = 100
// bet.disabled = true;

all.addEventListener("click",()=>{
  bet.value = point.value
  // console.log("ok")

})


//playerがカードを引くアクション
const hiku = ()=>{
  const newcard = document.createElement("li")
newcard.setAttribute("id","new_card")
    newcard.innerHTML = test.get_number_p()
    cards_p.appendChild(newcard);
    total_p.innerText = test.cards_sum_p()
    if (total_p.textContent >= 22){
      total_p.innerText =`Burstしました(合計:${total_p.textContent})あなたの負けです。`
      btn_draw.removeEventListener("click", hiku)
      btn_pass.removeEventListener("click", pass)
    }
  }

//passを押してcpuに受け渡すアクション
const pass = ()=>{
  btn_draw.removeEventListener("click", hiku)
console.log("相手がカードをopenしました。")


set_4.innerHTML = test.get_number_c()
total_c.innerText = test.cards_sum_c()
btn_pass.removeEventListener("click", pass)
//17以上かoverするまで引き続ける。
    function sleep(msec) {
      return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, msec);
      })
    }

    async function start() {
    await sleep(2000);
    if (total_c.textContent <=16){
      const newcard = document.createElement("li")
      newcard.setAttribute("id","new_card")
    newcard.innerHTML = test.get_number_c()
    cards_c.appendChild(newcard);
    total_c.innerText = test.cards_sum_c() 

      if (total_c.textContent >= 22){
        total_c.innerText =`CPUはBurstしました(合計:${total_c.textContent})あなたの勝ちです。`
        point.value = bet.value * 2
      }
      else{
        start()
      }

    }
    else{
      //両者Burstしなかった時の勝敗
      if(test.cards_sum_c() < test.cards_sum_p()){
        console.log("あなたの勝ちです。")
        point.value = bet.value * 2
      }
      else if(test.cards_sum_c() == test.cards_sum_p()){
        console.log("引き分けです")
        point.value = bet.value
      }
      else {
        console.log("あなたの負けです。")
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
  

    set_1.innerHTML = test.get_number_p();
    set_2.innerHTML = test.get_number_p();
    set_3.innerHTML = test.get_number_c();

    total_p.innerText = test.cards_sum_p();
    total_c.innerText = test.cards_sum_c();
    btn_draw.addEventListener("click", hiku);
    btn_pass.addEventListener("click", pass);
    start.removeEventListener("click", start_card)

    
    var remain = (point.value- bet.value)
    point.value = remain}
  }

  const next = document.getElementById("next")
  next.addEventListener("click", next_game)

  //次のゲームのため、リセットを行う
  function next_game() {
    set_1.innerHTML = ""
    set_2.innerHTML = ""
    set_3.innerHTML = ""
    set_4.innerHTML = ""
    total_p.innerHTML = "合計:"
    total_c.innerHTML = "合計:"
    
    var delete_card = document.querySelectorAll("#new_card")
    if (delete_card){
      delete_card.forEach(function(list) {
        list.remove()
      })
    }
  //カードを山札に戻す
    test.reset_card()
    start.addEventListener("click", start_card)
  }


  
})
