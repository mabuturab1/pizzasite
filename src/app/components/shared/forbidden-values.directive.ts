import { Directive, Input } from "@angular/core";
import { Validator, AbstractControl, ValidationErrors } from "@angular/forms";
@Directive({
  selector: "[appForbiddenValues]"
})
export class ForbiddenValuesDirective implements Validator {
  validate(control: AbstractControl): { forbiddenName: string } | null {
    if (this.forbiddenList.includes(control.value))
      return {
        forbiddenName: "Value already available. Choose a different one"
      };
    else return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
  @Input("appForbiddenValues") forbiddenList: string[];
  constructor() {}
}
