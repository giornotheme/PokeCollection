import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-message',
	templateUrl: './dialog-message.component.html',
})
export class DialogMessageComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: { error: string }) {}
}
