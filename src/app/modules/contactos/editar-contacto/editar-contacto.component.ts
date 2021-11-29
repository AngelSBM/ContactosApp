import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';
import { CorreosService } from 'src/app/services/correos.service';
import { TelefonosService } from 'src/app/services/telefonos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.scss']
})
export class EditarContactoComponent implements OnInit {

  id: string = "";
  listCorreos: any;
  listTelefonos: any;

  infoContacto:any = { }

  editForm = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    cedula: [''],
  });

  constructor(private formBuilder : FormBuilder,
              private contactoService : ContactosService,
              private correosService: CorreosService,
              private telefonosService: TelefonosService,
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.contactoService.getContactoById(this.id)
    .subscribe(resp => {
      this.infoContacto.nombre = resp.nombre;
      this.infoContacto.apellido = resp.apellido;
      this.infoContacto.cedula = resp.cedula;
      
      
    })

    this.listTelefonos = [];
    this.listCorreos = [];

    this.correosService.getCorreos(this.id)
      .subscribe(resp => {
        this.listCorreos = resp || [];

      })
      this.telefonosService.getTelefonos(this.id)
      .subscribe(resp => {
        this.listTelefonos = resp || [];

        console.log(resp);
        
      })
  }


  submit(){

    this.validar();

    //Create a object with data updated
    let data = {
      Nombre: this.editForm.get("nombre")?.value,
      Apellido: this.editForm.get("apellido")?.value,
      Cedula: this.editForm.get("cedula")?.value,
      Telefonos: this.listTelefonos,
      Correos: this.listCorreos
    }


    this.contactoService.putContacto(data, this.id)
        .subscribe((resp : any) => {
          
          this.listCorreos.forEach((correo:any) => {
            console.log(correo);
            
            this.correosService.putCorreo(this.id, correo.id, {direccionCorreo: correo.direccionCorreo})
              .subscribe()
          });

          Swal.fire({
            icon: 'success',
            title: '¡Modificado!',
            text: `Contacto mofificado`,
          })

          this.volver();
          
        })
    
    
  }

  eliminar(){

    let cantidadContactos = []
    this.contactoService.getContactos()
        .subscribe(resp => {
          cantidadContactos = resp;
          console.log(resp);
          
          if(resp.length === 1){
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'Debes tener por lo menos un contacto registrado.'
            })
      
            return;
          }
      
        })
    

    Swal.fire({
      title: '¿Está seguro que desea eliminar este contacto?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      icon:'warning',
      denyButtonText: 'Cancelar',
    }).then((result) => {
        if(result.isConfirmed){
          this.contactoService.deleteContacto(this.id)
          .subscribe(resp => {            
          })
          Swal.fire('Eliminado', '', 'info')
            this.volver()
        }else if (result.isDenied) {
          Swal.fire('No se ha eliminado el contacto.', '', 'info')
        }
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

  volver(){
    setTimeout(() => {
      this.router.navigateByUrl('/lista')
    }, 1000);
  }

}
