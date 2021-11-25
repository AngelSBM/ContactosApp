import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.scss']
})
export class NuevoContactoComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
              private contctosService : ContactosService,
              private router : Router) { }

  registerForm = this.formBuilder.group({
    nombre: [''],
    apellidos: [''],
    cedula: [''],
    correo: [''],
    telefono: ['']
  })

  ngOnInit(): void {
  }

  submit(){
    
    if(this.registerForm.get("nombre")?.value == ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo nombre es obligatorio.',
      })
      return;
    }

    if(this.registerForm.get("correo")?.value == "" && 
    this.registerForm.get("telefono")?.value == ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Para registrar un contacto, debe contar con por lo menos un correo o un teléfono.',
      })
      return;
    }

    let data = {
      Nombre: this.registerForm.get("nombre")?.value,
      Apellidos: this.registerForm.get("apellidos")?.value,
      Cedula: this.registerForm.get("cedula")?.value,
      Correos: [
        {
          direccionCorreo: this.registerForm.get("correo")?.value
        }
      ],
      Telefonos: [
        {
          numeroTelefono: this.registerForm.get("telefono")?.value
        }
      ]
    }

    this.contctosService.postContacto(data)
        .subscribe((resp : any) => {
          console.log(resp);
          
          Swal.fire({
            icon: 'success',
            title: '¡Creado!',
            text: `Contacto ${resp.nombre} creado`,
          })

          setTimeout(() => {
            this.router.navigateByUrl('/lista')
          }, 3000);
          
        })
    
    
  }

}
