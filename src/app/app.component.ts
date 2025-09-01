import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';   
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio';
  rober = "<Rober/>"

  constructor(
    private route:Router,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  form = this.fb.group({
    nombre: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
    website:['']
  })

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Demo: abrir mailto. Cambiá el email destino.
    const { nombre, email, mensaje } = this.form.value!;
    const subject = encodeURIComponent(`Mensaje de ${nombre}`);
    const body = encodeURIComponent(`${mensaje}\n\nContacto: ${email}`);
    window.location.href = `mailto:alex@ejemplo.com?subject=${subject}&body=${body}`;
  }
  
  get f() { return this.form.controls; }

  openGmail(){
    const email = `https://mail.google.com/mail/?view=cm&fs=1&to=rodevito2004@gmail.com&su=Consulta&body=Hola Roberto, quisiera más información.`;
    window.open(email, '_blank')
  }

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }


  async enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // honeypot
    if (this.form.value.website) return;

    const { nombre, email, mensaje } = this.form.value!;

    try {
      await emailjs.send(
        'service_uzm5h07',        // 👈 tu Service ID
        'template_fntqefu',       // 👈 tu Template ID
        {
          nombre: nombre,
          email: email,
          mensaje: mensaje
        },
        { publicKey: 'he9iuTO_0zatRHp3M' } // 👈 pegá tu Public Key aquí
      );

      alert('¡Mensaje enviado con éxito!');
      this.form.reset();
    } catch (err: any) {
      console.error(err);
      alert('Error al enviar. ' + (err?.text || err?.message || err));
    }
  }

}
