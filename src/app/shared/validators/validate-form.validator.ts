import { UntypedFormGroup, ValidationErrors } from "@angular/forms";

export function ValidateForm(formName: any): any {
    return function (target: any, key: any, descriptor: any) {
        const originalMethod: Function = descriptor.value;

        descriptor.value = function (this, ...args: any) {
            let formGroup: UntypedFormGroup = this[formName];
            if (ValidateActualForm(formGroup)) {
                originalMethod.apply(this, args);
            }
        };

        return descriptor;
    }
}
export function ValidateActualForm(form: UntypedFormGroup): boolean {
    if (!form.valid) {
        for (let i in form.controls) {
            let control: any = form.controls[i];
            control.markAsTouched();
            if (control.controls) {
                ValidateActualForm(control);
                console.log(control);
            }
        }
        return false;
    }
    else {
        return true;
    }
}

export function getFormValidationErrors(form: UntypedFormGroup): any {

    const result: any = [];
    Object.keys(form.controls).forEach(key => {
        const controlErrors: ValidationErrors | null | undefined = form.get(key)?.errors;
        if (controlErrors) {
            Object.keys(controlErrors).forEach(keyError => {
                result.push({
                    "control": key,
                    "error": keyError,
                    "value": controlErrors[keyError]
                });
            });
        }
    });

    return result;
}
