import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation_message = {
    email : [
      {type: "required", message: "El email es requerido"},
      {type: "pattern", message: "Ojo! este no es un email valido"}
    ],
    password : [
      {type: "required", message: "El password es requerido"},
      {type: "minLength", message: "Minimo 5 letras para el password"}
    ],
    nombre : [
      {type: "required", message: "El nombre es requerido"},
      {type: "minLength", message: "Minimo 3 letras para el password"}
    ],
    apellido : [
      {type: "required", message: "El apellido es requerido"},
      {type: "minLength", message: "Minimo 3 letras para el password"}
    ]
  }
  errorMessage: string = "";
  

  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private navCtrl: NavController,
              private storage: Storage) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      nombre: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      apellido: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    }) 
  }

  ngOnInit() {
  }

  registerUser(userData){
    console.log(userData);
    this.authenticateService.registerUser(userData).then(()=> {
      this.navCtrl.navigateBack('/login');
    })
    
  }

  goToLogin(){
    this.navCtrl.navigateBack('/login');
  }

}
