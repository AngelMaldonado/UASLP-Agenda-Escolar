// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

export enum TemaComponente {
  Primario = "primary", PrimarioInverso = "primary-inverse",
  Secundario = "secondary",
  Danger = "danger", DangerInverso = "danger-inverse",
  Success = "success", SuccessInverso = "success-inverse",
}

export enum TamanoComponente {
  Lg = "lg",
  Md = "md",
  Sm = "sm",
}
