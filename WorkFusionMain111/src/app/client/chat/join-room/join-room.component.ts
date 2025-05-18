import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Get FullName from local storage
    const fullName = localStorage.getItem('FullName') || 'Unknown User';

    // Initialize the form
    this.joinRoomForm = this.fb.group({
      user: [{ value: fullName +' (Client)', disabled: true }, Validators.required], // Prefilled and disabled
      room: ['', Validators.required], // Room name is editable
    });
  }

  joinRoom() {
    if (this.joinRoomForm.valid) {
      const user = this.joinRoomForm.get('user')!.value; // Access disabled field value
      const { room } = this.joinRoomForm.value;

      sessionStorage.setItem('user', user);
      sessionStorage.setItem('room', room);

      this.chatService
        .joinRoom(user, room)
        .then(() => {
          this.router.navigate(['client/chat']);
        })
        .catch((err) => {
          console.error('Error joining room: ', err);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
