import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
              private router : Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.contactoService.getContactoById(this.id)
    .subscribe(resp => {
      this.infoContacto.nombre = resp.nombre;
      this.infoContacto.apellido = resp.apellido;
      this.infoContacto.cedula = resp.cedula;
      this.listCorreos = resp.correos;
      this.listTelefonos = resp.telefonos;
      
      for (let i = 0; i < resp.correos.length; i++) {
        const element = resp.correos[i].direccionCorreo;
        this.editForm.addControl(`email${i}`, new FormControl(''));
        this.editForm.controls[`email${i}`].setValue(element);

      }

      for (let i = 0; i < resp.telefonos.length; i++) {
        const element = resp.telefonos[i].numeroTelefono;
        this.editForm.addControl(`telefono${i}`, new FormControl(''));
        this.editForm.controls[`telefono${i}`].setValue(element)

      }


      console.log(resp.telefonos);
      
      

      this.cargarCorreoYTelefonos()


      // this.infoContacto.correo = resp.correos[0].direccionCorreo;
      // this.infoContacto.telefono = resp.telefonos[0].numeroTelefono;
      console.log(this.editForm.value);
      
    })
  }


  submit(){

    this.validar();
     
    
    let CorreosRes: any = [];
    let TelefonosRes: any = [];

    
    for (let i = 0; i < Object.keys(this.editForm.value).length; i++) {
      const element = Object.keys(this.editForm.value)[i];
      if(element.includes("mail")){
        const correo = {direccionCorreo: Object.values(this.editForm.value)[i]}
        CorreosRes.push(correo)
      }else if(element.includes("telefono")){
        const telefono = {numeroTelefono: Object.values(this.editForm.value)[i]}
        TelefonosRes.push(telefono)
      }
    }

    let data = {
      Nombre: this.editForm.get("nombre")?.value,
      Apellido: this.editForm.get("apellido")?.value,
      Cedula: this.editForm.get("cedula")?.value,
      Correos: CorreosRes,
      Telefonos: TelefonosRes
    }

    
    
    console.log(data);
    

    

    this.contactoService.putContacto(data, this.id)
        .subscribe((resp : any) => {
          
          Swal.fire({
            icon: 'success',
            title: '¡Modificado!',
            text: `Contacto mofificado`,
          })

          this.volver();
          
        })
    
    
  }

  eliminar(){
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

  cargarCorreoYTelefonos(){

    const telefonosContainer = document.getElementById("telefonosContainer");
      const lenghtArrT = this.listTelefonos?.length;
      for (let i = 0; i < lenghtArrT; i++) {
        const input = document.createElement('input');
        input.setAttribute('formControlName', `correo${i}`);
        input.placeholder = "Telefono";
        input.type = "text";
        input.textContent = this.listTelefonos[i].numeroTelefono;
        input.value = this.listTelefonos[i].numeroTelefono;
        telefonosContainer?.appendChild(input);
      }

      const correosContainer = document.getElementById("correosContainer");
      const lenghtArrC = this.listCorreos?.length;
      for (let i = 0; i < lenghtArrC; i++) {
        const input = document.createElement('input');
        input.setAttribute('formControlName', `correo${i}`);
        input.type = "text";
        input.placeholder = "Correo"
        input.textContent = this.listCorreos[i].direccionCorreo;
        input.value = this.listCorreos[i].direccionCorreo;
        correosContainer?.appendChild(input);
      }

      console.log(this.listCorreos, this.listTelefonos);
      
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
