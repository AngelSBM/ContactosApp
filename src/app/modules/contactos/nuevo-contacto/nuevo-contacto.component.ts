import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.scss']
})
export class NuevoContactoComponent implements OnInit {

  id: number = 0;

  constructor(private formBuilder : FormBuilder,
              private contctosService : ContactosService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  registerForm = this.formBuilder.group({
    nombre: [''],
    apellidos: [''],
    cedula: [''],
    correo: [''],
    telefono: ['']
  });

  ngOnInit(): void {
  }

  submit(){
           
    this.validar();
    
    let data = {
      Nombre: this.registerForm.get("nombre")?.value,
      Apellido: this.registerForm.get("apellidos")?.value,
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

  addMail(){
    const telefonosContainer = document.getElementById("inputs");

    const input = document.createElement('input');
    input.placeholder = "Agregar otro teléfono";
    input.setAttribute('type', 'text');
    input.id = `input${telefonosContainer?.children.length}`;
    console.log(input);
    

    telefonosContainer?.appendChild(input) 
  }

  validar(){
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
  }

}
