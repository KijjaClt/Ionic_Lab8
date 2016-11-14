import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list = [];
  image = 'assets/img/todo.png';
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, public http: Http) {
     this.loadDB();
  }

  addDB(obj){
    this.http.post("http://angsila.informatics.buu.ac.th/~57160166/887330/store.php",obj)
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Add error");
      }
      
    }, err=>{
      console.log(err);
    })
  }

  loadDB(){
    this.http.get("http://angsila.informatics.buu.ac.th/~57160166/887330/load.php")
    .subscribe(data =>{
      this.list = data.json();
    }, err=>{
      console.log(err);
    })
  }

  addTodo(){
    let prompt = this.alertCtrl.create({
      title: "Add Contact",
      message: "Enter a data contact",
      inputs: [
        {
          name: 'fname',
          placeholder: 'First Name'
        },{
          name: 'lname',
          placeholder: 'Last Name'
        },{
          name: 'tel',
          placeholder: 'Phone'
        },{
          name: 'memo',
          placeholder: 'Memo'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler:data=>{
            console.log("cancel clicked");
          }
        },{
          text: 'Add',
          handler:data=>{
            this.list.push(data);
            this.addDB(data);
          }
        }

      ]
    })

    prompt.present();
  }

  goNextPage(todo){
    this.navCtrl.push(DetailPage,{
      todo: todo
    })
  }

  //remove(i){
   remove(id){
   //this.list.splice(i,1);
    this.http.post("http://angsila.informatics.buu.ac.th/~57160166/887330/delete.php",{id:id})
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Delete Faile");
      }
      
    }, err=>{
      console.log(err);
    })
  }
}
