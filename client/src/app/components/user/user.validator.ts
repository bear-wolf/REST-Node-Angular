/**
 * Created by admin on 07.01.2017.
 */
import { FormControl } from "@angular/forms";

interface ValidationResult {
    [key:string]:any;
}

export class UserValidator {
    static required(control: FormControl): ValidationResult {
        if ( control.value == ''){
            return { 'error': 'Field is required!' };
        }
        return null;
    }
    static email(control: FormControl): ValidationResult {
        let position = {
            letter : control.value.indexOf('@'),
            point : control.value.indexOf('.')
        };
        if ( position.letter<=0 || position.letter > position.point){
            return { 'error': 'Field is required!' };
        }
        return null;
    }
}