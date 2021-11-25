import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var Swal : any;

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.scss']
})
export class NuevoContactoComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  registerForm = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    cedula: [''],
    correos: [''],
    telefonos: ['']
  })

  ngOnInit(): void {
  }

  submit(){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )

    let data = {
      "Nombre": this.registerForm.get("nombre")?.value,
      "Apellidos": this.registerForm.get("apellido")?.value,
      "Cedula": this.registerForm.get("cedula")?.value,
      "Correos": {
        "direccionCorreo": this.registerForm.get("correos")?.value
      },
      "Telefonos": {
        "numeroTelefono": this.registerForm.get("telefonos")?.value
      }
    }

    console.log(data);
    
    
  }

}
