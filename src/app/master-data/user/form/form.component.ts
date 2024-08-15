import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getFormValidationErrors, ValidateForm } from 'src/app/shared';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form!: UntypedFormGroup;
  model: any = {};
  sub: any;
  id: any = "";
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.sub = this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id) {
        this.searchId();
      }
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: [{ value: '', disabled: false }, Validators.required],
      lastName:[{ value: '', disabled: false }, Validators.required],
      phone:[{ value: '', disabled: false }, [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      email:[{ value: '', disabled: false }, [Validators.required, Validators.email]],
    });
  }

  searchId() {
    this.apiService.get('User/find/' + this.id).subscribe((response: any) => {
      this.model = response;
    });
  }

  create() {
    this.apiService.post('User/new', this.model).subscribe((response: any) => {
      if (response.isSuccess) {
        window.alert("Create Success");
        this.router.navigate(["./"], {
          relativeTo: this.activatedRoute.parent,
        });
      }
    });
  }

  update() {
    this.model.id = this.id
    this.apiService.post('User/update',this.model).subscribe((response: any) => {
      if (response.isSuccess) {
        window.alert("Update Success");
        this.router.navigate(["./"], {
          relativeTo: this.activatedRoute.parent,
        });
      }
    });
  }

  isFieldValid(field: string): boolean {
    var notValid: any = this.form!.get(field)?.errors;
    var isTouch: any = this.form!.get(field)?.touched;
    return notValid && isTouch;
  }

  getTouchControl(field: string): any {
    var control: AbstractControl | null = this.form.get(field);
    var isTouch: boolean | undefined = control?.touched;
    return control;
  }

  displayFieldCss(field: string): any {
    return {
      "is-invalid": this.isFieldValid(field),
      "": !this.isFieldValid(field),
    };
  }

  back(){
    this.router.navigate(["./"], {
      relativeTo: this.activatedRoute.parent,
    });
  }

  validateAllForm(): any {
    return getFormValidationErrors(this.form);
  }

  
  @ValidateForm("form")
  save(): void {
    if (!this.id) {
      this.create();
    } else {
      this.update();
    }
  }
}
