import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.scss']
})
export class EditarContactoComponent implements OnInit {

  id: string = "";

  infoContacto:any = { }

  registerForm = this.formBuilder.group({
    nombre: [''],
    apellidos: [''],
    cedula: [''],
    correo: [''],
    telefono: ['']
  });

  constructor(private formBuilder : FormBuilder,
              private contactoService : ContactosService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.contactoService.getContactoById(this.id)
    .subscribe(resp => {
      this.infoContacto.nombre = resp.nombre;
      this.infoContacto.apellido = resp.apellido;
      this.infoContacto.cedula = resp.cedula;
      this.infoContacto.correo = resp.correos[0].direccionCorreo;
      this.infoContacto.telefono = resp.telefonos[0].numeroTelefono;
      console.log(resp);
      
    })
  }




  // submit(){
    
  //   if(this.registerForm.get("nombre")?.value == ""){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'El campo nombre es obligatorio.',
  //     })
  //     return;
  //   }

  //   if(this.registerForm.get("correo")?.value == "" && 
  //   this.registerForm.get("telefono")?.value == ""){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Para registrar un contacto, debe contar con por lo menos un correo o un teléfono.',
  //     })
  //     return;
  //   }

  //   let data = {
  //     Nombre: this.registerForm.get("nombre")?.value,
  //     Apellidos: this.registerForm.get("apellidos")?.value,
  //     Cedula: this.registerForm.get("cedula")?.value,
  //     Correos: [
  //       {
  //         direccionCorreo: this.registerForm.get("correo")?.value
  //       }
  //     ],
  //     Telefonos: [
  //       {
  //         numeroTelefono: this.registerForm.get("telefono")?.value
  //       }
  //     ]
  //   }

  //   this.contactoService.putContacto(data)
  //       .subscribe((resp : any) => {
  //         console.log(resp);
          
  //         Swal.fire({
  //           icon: 'success',
  //           title: '¡Creado!',
  //           text: `Contacto ${resp.nombre} creado`,
  //         })

  //         setTimeout(() => {
  //           this.router.navigateByUrl('/lista')
  //         }, 3000);
          
  //       })
    
    
  // }


}
