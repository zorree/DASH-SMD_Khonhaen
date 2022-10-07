import { Component ,OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Socket } from 'ngx-socket-io';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { HttpClient } from '@angular/common/http';
import { url } from './../data/url';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  day:any;
  days:any;
  month:any;
  year:any;
  intervalVar;
  private receivedMessages1 =[];
  private receivedMessages2 =[];
  private receivedMessages3 =[];
  private receivedMessages4 =[];
  private receivedMessages5 =[];
  private receivedMessages_pay= [];

  slot1=[];
  slot2=[];
  slot3=[];
  slot4=[];
  slot5=[];

  dash1=[];
  dash2=[];
  dash3=[];
  dash4=[];
  dash5=[];

  messages1 = [];
  messages2 = [];
  messages3 = [];
  messages4 = [];
  messages5 = [];

  reset_d1=[];
  reset_d2=[];
  reset_d3=[];
  reset_d4=[];
  reset_d5=[];
 
  color1:any ='#5271C2';
  color2:any ='#5271C2';
  color3:any ='#5271C2';
  color4:any ='#5271C2';
  color5:any ='#5271C2';

  public ddd : number  = Date.now();

  fontcolor;
  boxcolor;

  blink = "blink"; 

  i: any =1;

  json_que_call:any;

  clockElts = [];
  clockTimer = null;
  cpt = 0;

  que = [];
  news;
  msg_news=[];
  msg_length=[];
  msg_news_string:string;
  constructor(private socket: Socket,
    private nativeAudio: NativeAudio,
     public platform: Platform,
      private media: Media,
      private http:HttpClient
    ) {  
    this.socket.connect();
    this.startTime();
  }

  ionViewWillEnter(){
    this.nativeAudio.preloadSimple('getnumber', 'assets/getnumber.mp3');
    this.nativeAudio.preloadSimple('getdrug', 'assets/getdrug.mp3');
    this.nativeAudio.preloadSimple('0', 'assets/0.mp3');
    this.nativeAudio.preloadSimple('1', 'assets/1.mp3');
    this.nativeAudio.preloadSimple('2', 'assets/2.mp3');
    this.nativeAudio.preloadSimple('3', 'assets/3.mp3');
    this.nativeAudio.preloadSimple('4', 'assets/4.mp3');
    this.nativeAudio.preloadSimple('5', 'assets/5.mp3');
    this.nativeAudio.preloadSimple('6', 'assets/6.mp3');
    this.nativeAudio.preloadSimple('7', 'assets/7.mp3');
    this.nativeAudio.preloadSimple('8', 'assets/8.mp3');
    this.nativeAudio.preloadSimple('9', 'assets/9.mp3');
    this.nativeAudio.preloadSimple('finance','assets/finance.mp3');
    this.nativeAudio.play('finance');


  }

  ngOnInit(){

    this.socket.fromEvent('time').subscribe(message => {
      console.log(message)
    })

    this._currentDate$();
    this.socket.fromEvent('dash1').subscribe(message => {
      this.receivedMessages1=[];
      this.receivedMessages1.push(message);      
      this.dash1=JSON.parse(this.receivedMessages1[0]);   
      this.slot1.push(this.dash1[0]);
      console.log(this.slot1);

    })
    this.socket.fromEvent('dash2').subscribe(message => {
      this.receivedMessages2=[];
      this.receivedMessages2.push(message);      
      this.dash2=JSON.parse(this.receivedMessages2[0]);   
      this.slot2.push(this.dash2[0]);
      console.log(this.slot2);
    })
    this.socket.fromEvent('dash3').subscribe(message => {
      this.receivedMessages3=[];
      this.receivedMessages3.push(message);      
      this.dash3=JSON.parse(this.receivedMessages3[0]);   
      this.slot3.push(this.dash3[0]);
      console.log(this.slot3);
    })
    this.socket.fromEvent('dash4').subscribe(message => {
      this.receivedMessages4=[];
      this.receivedMessages4.push(message);      
      this.dash4=JSON.parse(this.receivedMessages4[0]);   
      this.slot4.push(this.dash4[0]);
      console.log(this.slot4);

    })
    this.socket.fromEvent('dash5').subscribe(message => {
      this.receivedMessages5=[];
      this.receivedMessages5.push(message);      
      this.dash5=JSON.parse(this.receivedMessages5[0]);   
      this.slot5.push(this.dash5[0]);
      console.log(this.slot5);

    })

    this.socket.fromEvent('pay_to_dash1').subscribe(message => {
      this.messages1=[];
      this.messages1.push(message);
      console.log(this.messages1);
      var x =this.messages1[0];
      var index = this.slot1.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot1[index].internal_que;
      console.log(x);
      
    })
    this.socket.fromEvent('pay_to_dash2').subscribe(message => {
      this.messages2=[];
      this.messages2.push(message);
      console.log(this.messages2);
      var x =this.messages2[0];
      var index = this.slot2.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot2[index].internal_que;
      console.log(x);
    })
    this.socket.fromEvent('pay_to_dash3').subscribe(message => {
      this.messages3=[];
      this.messages3.push(message);
      console.log(this.messages3);
      var x =this.messages3[0];
      var index = this.slot3.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot3[index].internal_que;
      console.log(x);
    })
    this.socket.fromEvent('pay_to_dash4').subscribe(message => {
      this.messages4=[];
      this.messages4.push(message);
      console.log(this.messages4);
      var x =this.messages4[0];
      var index = this.slot4.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot4[index].internal_que;
      console.log(x);
    })
    this.socket.fromEvent('pay_to_dash5').subscribe(message => {
      this.messages5=[];
      this.messages5.push(message);
      console.log(this.messages5);
      var x =this.messages5[0];
      var index = this.slot5.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot5[index].internal_que;
      console.log(x);
    })

    this.socket.fromEvent('next_to_dash1').subscribe(message => {
      this.messages1=[];
      this.messages1.push(message);
      console.log(this.messages1);
      var x =this.messages1[0];
      var index = this.slot1.findIndex(obj => obj.internal_que == x);
      console.log(index);
      delete this.slot1[index].internal_que;
      console.log(x);
    })

    this.socket.fromEvent('reset_to_dash1').subscribe(message => {
      this.reset_d1.push(message);      
      if(this.reset_d1 && this.reset_d1.length > 0){
          this.slot1=[];
      }
    })

    this.socket.fromEvent('reset_to_dash2').subscribe(message => {
      this.reset_d2.push(message);      
      if(this.reset_d2 && this.reset_d2.length > 0){
          this.slot2=[];
      }
    })

    this.socket.fromEvent('reset_to_dash3').subscribe(message => {
      this.reset_d3.push(message);      
      if(this.reset_d3 && this.reset_d3.length > 0){
          this.slot3=[];
      }
    })
    this.socket.fromEvent('reset_to_dash4').subscribe(message => {
      this.reset_d4.push(message);      
      if(this.reset_d4 && this.reset_d4.length > 0){
          this.slot4=[];
      }
    })
    this.socket.fromEvent('reset_to_dash5').subscribe(message => {
      this.reset_d5.push(message);      
      if(this.reset_d5 && this.reset_d5.length > 0){
          this.slot5=[];
      }
    })

    // this.socket.fromEvent('news').subscribe(message => {
    //    this.msg_news.push(message);
    //  console.log();
     
    //  for(let i =0; i < this.msg_news[0].length; i++){
    //    setTimeout(()=>{
    //       this.msg_length=[];
    //       this.msg_length.push(message[i].msg);
    //       this.msg_news_string = this.msg_length[0];
    //  },20000*i)
    // }  
    // })
    
    this.http.get(url + 'api/news').subscribe((response) => {
      console.log(response);
      this.msg_news.push(response);  
          
      for(let i =0; i < this.msg_news[0].length; i++){
        setTimeout(()=>{
           this.msg_length=[];
           this.msg_length.push(response[i].msg);
           this.msg_news_string = this.msg_length[0];
      },20000*i)
     }

  });
  
    this.socket.fromEvent('que').subscribe(message => {
      this.json_que_call =message;
      console.log(this.json_que_call);
      console.log(this.json_que_call[0].station_id);
      console.log(this.json_que_call[0].order_number);
    let x;
    let s=this.json_que_call[0].station_id;
    var n =this.json_que_call[0].order_number.toString();
    let j;

    for(j=0; j < 4; j++){
      setTimeout(()=>{
  if (this.i == 1) {
      setTimeout(()=>{
      this.nativeAudio.play('getnumber');
      console.log('getnumber');
       this.i=2;
    },1000)
    } else if(this.i == 2){  
     for(x= 0; n.length > x; x++ ){
        let c =n.charAt(x);
        setTimeout(()=>{
        this.nativeAudio.play(c);
        console.log(c);
        },1000 * x)
    }
    this.i =3;
    }else if(this.i == 3){
    setTimeout(()=>{
    this.nativeAudio.play('getdrug');
    console.log('getdrug');
     this.i=4;
    },1700)
   
    }else if (this.i == 4) {
      setTimeout(()=>{
        console.log('delay');
        },1000)
       setTimeout(()=>{
      this.nativeAudio.play(s);
      console.log(s);
        this.i=1;
    },1500)
    }
    },2500* j)
     }
     this.socket.emit('after_call', this.json_que_call[0].order_number);
   })
   

   
   this.socket.fromEvent('color1').subscribe(message => {
   console.log(message);
   
   this.color1 = message;
  })

  this.socket.fromEvent('color2').subscribe(message => {
    console.log(message);

    this.color2 = message;
   })


   this.socket.fromEvent('color3').subscribe(message => {
    console.log(message);

    this.color3 = message;
   })

   this.socket.fromEvent('color4').subscribe(message => {
    console.log(message);

    this.color4 = message;
   })

   this.socket.fromEvent('color5').subscribe(message => {
    console.log(message);

    this.color5 = message;
   })
   this.socket.fromEvent('fcolor').subscribe(message => {
    console.log(message);
    this.fontcolor = message;
   })

   this.socket.fromEvent('bcolor').subscribe(message => {
    console.log(message);
    this.boxcolor = message;
   })


  }


  // playAudio() {
  //   let x;
  //   let y;
  //   let n='771';
  //   let j;
  //   for(j=0; j < 4; j++){
  //     setTimeout(()=>{
  // if (this.i == 1) {
  //     setTimeout(()=>{
  //     this.nativeAudio.play('getnumber');
  //     console.log('getnumber');
  //      this.i=2;
  //   },2000)
  //   } else if(this.i == 2){  
  //    for(x= 0; n.length > x; x++ ){
  //       let c =n.charAt(x);
  //       setTimeout(()=>{
  //       this.nativeAudio.play(c);
  //       console.log(c);
  //       },1000 * x)
  //   }
  //   this.i =3;
  //   }else if(this.i == 3){
  //   setTimeout(()=>{
  //   this.nativeAudio.play('getdrug');
  //   console.log('getdrug');
  //    this.i=4;
  //   },1000)
   
  //   }else if (this.i == 4) {
  //      setTimeout(()=>{
  //     this.nativeAudio.play('1');
  //     console.log('1');
  //       this.i=1;
  //   },1000)
  //   }
  // },4000* j)
  //   }
  
  // }


  startTime() {
    this.intervalVar = setInterval(function () {
      this.today = new Date().toISOString();
    }.bind(this),500)
  }

  _currentDate$(){
    let monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
"กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
 let dayNames = ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"];
var d = new Date();
    this.day= dayNames[d.getDay()];
    this.days=d.getDate();
    this.month=monthNamesThai[d.getMonth()];
    this.year=d.getFullYear()+543;
 console.log("The current Date is  " + this.day+"  "+this.days+""+this.month+"  "+this.year);
  }


}
