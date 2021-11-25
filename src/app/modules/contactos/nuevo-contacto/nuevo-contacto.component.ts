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
  listCorreos: any;
  listTelefonos: any;

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
    
    let data = this.setCampos(this.listTelefonos, this.listCorreos);

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

  setCampos(telefonos: any, correos: any){

    this.listCorreos = correos;
    this.listTelefonos = telefonos;


    let Telefonos = [];
    for (let i = 0; i < telefonos.children.length; i++) {
      const value = telefonos.children[i].value;
      const tl = { numeroTelefono: value}
      Telefonos.push(tl);           
    }

    let Correos = [];
    for (let i = 0; i < correos.children.length; i++) {
      const value = correos.children[i].value;
      const cr = {direccionCorreo: value}
      Correos.push(cr);           
    }

    let data = {
      Nombre: this.registerForm.get("nombre")?.value,
      Apellido: this.registerForm.get("apellidos")?.value,
      Cedula: this.registerForm.get("cedula")?.value,
      Correos,
      Telefonos
    }

    return data;

  }

  addTelefono(){
    const telefonosContainer = document.getElementById("inputsTelefono");

    const input = document.createElement('input');
    input.placeholder = "Agregar otro teléfono";
    input.setAttribute('type', 'text');
    input.id = `inputTelefono${telefonosContainer?.children.length}`;

    telefonosContainer?.appendChild(input) 
  }

  addMail(){
    const correosContainer = document.getElementById("inputsCorreos");

    const input = document.createElement('input');
    input.placeholder = "Agregar otro coreeo";
    input.setAttribute('type', 'text');
    input.id = `inputCorreo${correosContainer?.children.length}`;

    correosContainer?.appendChild(input) 
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
