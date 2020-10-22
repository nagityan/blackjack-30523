export class Number {

  constructor() {
    this.cards=[]
    this.assign_p=[]
    this.assign_c=[]
    
    for (  var i = 1;  i < 14;  i++  ) {
      this.cards.push(i);
    }
}
//プレーヤー用のカード配布
  get_number_p(){
    
    var arrayIndex = Math.floor(Math.random() * this.cards.length);
    const pick = this.cards.splice(arrayIndex, 1)
    var pick_number = pick[0]
    if (pick_number >=11){
      pick_number = 10
    }
    this.assign_p.push(pick_number)
    // console.log(pick_number)
    return pick
  }
//cpu用のカード配布
  get_number_c(){
    var arrayIndex = Math.floor(Math.random() * this.cards.length);
    const pick = this.cards.splice(arrayIndex, 1)
    var pick_number = pick[0]
    if (pick_number >=11){
      pick_number = 10
    }
    this.assign_c.push(pick_number) 
    return pick
  }

  cards_sum_p(){
  
    var sum = 0
    for (let i = 0, len = this.assign_p.length; i < len; i++) {
      if(this.assign_p[i]==1){
        this.assign_p[i] = 11
      }
      sum += this.assign_p[i];
    }
    //1を含めた合計が22以上の場合、11を1として計算する。
    if(sum >=22 && this.assign_p.includes(11)){
      sum = 0
      for (let i = 0, len = this.assign_p.length; i < len; i++) {
        if(this.assign_p[i]==11){
          this.assign_p[i] = 1
        }
        sum += this.assign_p[i];
      }
    }
    return  sum
    
  }

  cards_sum_c(){
  
    var sum_c = 0
    for (let i = 0, len = this.assign_c.length; i < len; i++) {
      if(this.assign_c[i]==1){
        this.assign_c[i] = 11
      }
      sum_c += this.assign_c[i];
    }
    //1を含めた合計が22以上の場合、11を1として計算する。
    if(sum_c >=22 && this.assign_c.includes(11)){
      sum_c = 0
      for (let i = 0, len = this.assign_c.length; i < len; i++) {
        if(this.assign_c[i]==11){
          this.assign_c[i] = 1
        }
        sum_c += this.assign_c[i];
      }
    }

    return  sum_c
    
  }


//カードを元に戻す。山札は再補充する。
  reset_card(){
    this.assign_p.length = 0
    this.assign_c.length = 0
    this.cards.length = 0
    
    for (  var i = 1;  i < 14;  i++  ) {
      this.cards.push(i);
    }
  }
  

}