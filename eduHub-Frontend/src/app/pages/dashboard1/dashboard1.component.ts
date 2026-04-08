import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css'],
})
export class Dashboard1Component {
  newUser = { username: '', email: '' }; // Model for new user form
  users = [
    { id: 1, username: 'Arya ', email: 'arya@gmail.com' },
    { id: 2, username: 'eduhub', email: 'eduhub@gmail.com' },
  ];

  // Method to add a new user
  addUser(form: any) {
    if (form.valid) {
      const newId = this.users.length + 1; // Generate a unique ID
      this.users.push({ id: newId, ...this.newUser });
      this.newUser = { username: '', email: '' }; // Reset form inputs
    }
  }

  // Method to delete a user by ID
  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
