import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';
import {Attribute, Directive, forwardRef} from '@angular/core';

@Directive({
  selector: '[validateCpf][formControlName],[validateCpf][formControl],[validateCpf][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => CpfValidator), multi: true}
  ]
})
export class CpfValidator implements Validator {
  constructor(@Attribute('validateCpf') public validateCpf: string) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return cpfValidator();
  }
}


//VALIDA CPF
export function cpfValidator(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!c.value || !c.value.length) return {
      exception: null
    };

    if (invalidateCpf(c.value.replace(/[^0-9]/g, ''))) return {
      exception: 'CPF inválido'
    };

    return null;
  };
}


//Verifica se CPF é válido
export function invalidateCpf(strCPF) {
  let soma, resto: number;
  soma = 0;

  if (strCPF == "00000000000" ||
    strCPF == "11111111111" ||
    strCPF == "22222222222" ||
    strCPF == "33333333333" ||
    strCPF == "44444444444" ||
    strCPF == "55555555555" ||
    strCPF == "66666666666" ||
    strCPF == "77777777777" ||
    strCPF == "88888888888" ||
    strCPF == "99999999999") {
    return true;
  }

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11)) {
    resto = 0;
  }

  if (resto != parseInt(strCPF.substring(9, 10))) {
    return true;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11)) {
    resto = 0;
  }

  return resto != parseInt(strCPF.substring(10, 11));
}

@Directive({
  selector: '[validateCnpj][formControlName],[validateCnpj][formControl],[validateCnpj][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => CnpjValidator), multi: true}
  ]
})
export class CnpjValidator implements Validator {
  constructor(@Attribute('validateCnpj') public validateCnpj: string) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return cnpjValidator();
  }
}

//Valida CNPJ
export function cnpjValidator(): ValidatorFn {

  return (c: AbstractControl): { [key: string]: any } => {

    if (!c.value || !c.value.length) return {
      exception: null
    };

    if (invalidateCnpj(c.value.replace(/[^0-9]/g, ''))) return {
      exception: 'CNPJ inválido'
    };
    return null;
  }
}

export function maxLength(max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!c.value || !c.value.length)
      return null;
    else if (c.value.length > max) return {
      exception: 'O campo deve ter menos que ' + max + ' caracteres!'
    }
  }
}

export function minLength(min: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!c.value || !c.value.length)
      return null;
    else if (c.value.length < min) return {
      exception: 'O campo deve ter menos que ' + min + ' caracteres!'
    }
  }
}

export function min(min: number, exception: String): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (c.value !== undefined && c.value !== null && c.value < min) {
      return {
        exception: exception ? exception : 'O campo deve ser maior que ' + min
      }
    } else return null
  }
}

// Validação de obrigatorio
export function obrigatorio(exception?: string, validatorFn?: ValidatorFn): ValidatorFn {
  if (validatorFn)
    return validatorFn;
  return (c: AbstractControl): { [key: string]: any } => {

    if (c.value === undefined || c.value === null) return {
      exception: exception ? exception : 'Campo obrigatório'
    };

    if (typeof c.value === 'string')
      if (!c.value.length) return {
        exception: exception ? exception : 'Campo obrigatório'
      };

    return null
  }
}


//Verifica se CPF é válido
export function invalidateCnpj(cnpj) {

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '') return true;

  if (cnpj.length != 14)
    return true;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return true;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return true;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado != digitos.charAt(1)
}


// @Directive({
//   selector: '[ngModel]',
//   providers: [
//     {provide: NG_VALIDATORS, useExisting: forwardRef(() => DataValidator), multi: true}
//   ]
// })
// export class DataValidator implements Validator {
//   constructor(@Attribute('ngModel') public validateData: string) {
//   }
//
//   validate(c: AbstractControl): { [key: string]: any } {
//     return dataIsBefore(c.value);
//   }
// }
//
//
// // Valida data passando um valor máximo e mínimo
// export function dataIsBefore(data): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: any } => {
//     try {
//       if (!c.value || !c.value.toString().length) return {
//         exception: null
//       };
//
//       let momentDataPGRS = moment(c.value, "DD-MM-YYYY");
//
//       if (momentDataPGRS.isBefore(data)) {
//         return {
//           exception: 'Insira uma data anterior a ' + data
//         };
//       }
//     } catch (e) {
//       return {
//         exception: false
//       };
//     }
//     return null;
//   }
// }
//
// export function dataIsAfter(data): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: any } => {
//     try {
//       if (!c.value || !c.value.toString().length) return {
//         exception: null
//       };
//
//       let momentDataPGRS = moment(c.value, "DD-MM-YYYY");
//
//       if (momentDataPGRS.isAfter(data)) {
//         return {
//           exception: 'Insira uma data posterior a ' + data
//         };
//       }
//     } catch (e) {
//       return {
//         exception: false
//       };
//     }
//     return null;
//   }
// }
//
// export function dataIsValid(data): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: any } => {
//     try {
//       if (!c.value || !c.value.toString().length) return {
//         exception: null
//       };
//
//       let momentDataPGRS = moment(c.value, "DD-MM-YYYY");
//
//       if (!momentDataPGRS.isValid() || c.value.length < 8) {
//         return {
//           exception: 'Data inválida'
//         };
//       }
//     } catch (e) {
//       return {
//         exception: false
//       };
//     }
//     return null;
//   }
// }


// Valida a confirmação de password
export function confirmPassword(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!c.value || !c.value.length) return {
      exception: null
    };

    if (c.parent && c.value.length && c.parent.controls['password'].value != c.value) return {
      exception: 'A senha e sua confirmação não conicidem'
    };
  }
}


// Valida a  password
export function password(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!c.value || !c.value.length) return {
      exception: null
    };

    if (c.parent && c.value.length && c.parent.controls['confirmacaoPassword'].value != c.value) {
      c.parent.controls['confirmacaoPassword'].setErrors({exception: 'A senha e sua confirmação não conicidem'})
    }

    if (c.value.length < 6) return {
      exception: 'A senha deve conter no mínimo 6 caracteres'
    };
  }
}
