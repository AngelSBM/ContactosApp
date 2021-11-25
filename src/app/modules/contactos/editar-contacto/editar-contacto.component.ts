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

  editForm = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
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


  submit(){

    this.validar();
    
    let data = {
      Nombre: this.editForm.get("nombre")?.value,
      Apellido: this.editForm.get("apellido")?.value,
      Cedula: this.editForm.get("cedula")?.value,
      Correos: [
        {
          direccionCorreo: this.editForm.get("correo")?.value
        }
      ],
      Telefonos: [
        {
          numeroTelefono: this.editForm.get("telefono")?.value
        }
      ]
    }

    this.contactoService.putContacto(data, this.id)
        .subscribe((resp : any) => {
          
          Swal.fire({
            icon: 'success',
            title: '¡Modificado!',
            text: `Contacto mofificado`,
          })

          setTimeout(() => {
            this.router.navigateByUrl('/lista')
          }, 3000);
          
        })
    
    
  }

  validar(){
      if(this.editForm.get("nombre")?.value == ""){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El campo nombre es obligatorio.',
        })
        return;
      }

      if(this.editForm.get("correo")?.value == "" && 
      this.editForm.get("telefono")?.value == ""){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Para registrar un contacto, debe contar con por lo menos un correo o un teléfono.',
        })
        return;
    }

  }



}
