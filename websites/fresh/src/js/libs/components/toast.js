import { Notyf } from 'notyf';

export function successToast(message) {
    const notyf = new Notyf();
    notyf.success(message);
}

export function errorToast(message) {
    const notyf = new Notyf();
    notyf.error(message);
}