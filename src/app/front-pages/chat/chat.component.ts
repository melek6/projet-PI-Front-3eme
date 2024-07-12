import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ChatService } from "src/app/_services/chat/chat.service";
import { StorageService } from "src/app/_services/storage.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  messageList: Message[] = [];
  chatList: Chat[] = [];
  chatData: Chat;
  chatId: any = sessionStorage.getItem("chatId");
  otherUserUsername = "";
  allUsers: User[] = [];
  userMessages: any[] = [];
  user: any;
  currentUserUsername: string;
  senderUsername: string;
  senderCheck: string;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.chatForm = new FormGroup({
      replyMessage: new FormControl(),
    });

    const user = this.storageService.getUser();
    if (user) {
      this.currentUserUsername = user.username;
      this.senderUsername = user.username;
      this.senderCheck = user.username;
    }
  }

  ngOnInit(): void {
    if (this.currentUserUsername) {
      if (this.chatId) {
        this.loadChatById();
      }
    } else {
      console.error("User is not logged in.");
      this.router.navigate(["/login"]);
    }

    this.chatService.getUsers().subscribe((data) => {
      this.allUsers = data;
    });
    this.user = this.chatService.getUserIdFromToken();
    console.log("hey", this.user);
    if (this.user) {
      console.log("User ID:", this.user.id); // Ensure user ID is correctly set

      this.chatService.getUserMessages(this.user.id).subscribe(
        (messages) => {
          this.userMessages = messages;
          console.log("Messages received in component:", this.userMessages); // Log here to see the data
        },
        (error) => {
          console.error("Error fetching messages:", error);
        }
      );
    }
  }

  loadChats(): void {
    setInterval(() => {
      if (this.currentUserUsername) {
        this.chatService.getChatByUsername(this.currentUserUsername).subscribe(
          (data) => {
            this.chatList = data;
          },
          (error) => {
            console.error("Error loading chats:", error);
          }
        );
      }
    }, 1000);
  }

  loadChatById(): void {
    setInterval(() => {
      if (this.chatId) {
        this.chatService.getChatById(this.chatId).subscribe(
          (data: Chat) => {
            this.chatData = data;
            this.messageList = this.chatData.messageList;
            this.otherUserUsername = this.chatData.user2.username;
            this.currentUserUsername = this.chatData.user1.username;
          },
          (error) => {
            console.error("Error loading chat by ID:", error);
          }
        );
      }
    }, 1000);
  }

  loadChatByUsername(event: string, event1: string): void {
    sessionStorage.removeItem("chatId");
    this.chatService.getChatByUsername(event).subscribe(
      (data: Chat[]) => {
        this.chatData = data.find(
          (chat) =>
            chat.user2.username === event1 || chat.user1.username === event1
        );
        if (this.chatData) {
          this.chatId = this.chatData.id.toString();
          sessionStorage.setItem("chatId", this.chatId);
          this.loadChatById();
        }
      },
      (error) => {
        console.error("Error loading chat by username:", error);
      }
    );
  }

  sendMessage(): void {
    this.messageObj.replyMessage = this.chatForm.value.replyMessage;
    this.messageObj.senderUsername = this.senderUsername;
    this.chatService.updateChat(this.messageObj, this.chatId).subscribe(
      () => {
        this.chatForm.reset();
        this.loadChatById();
      },
      (error) => {
        console.error("Error sending message:", error);
      }
    );
  }

  goToChat(username: string): void {
    const selectedUser = this.allUsers.find(
      (user) => user.username === username
    );
    if (selectedUser) {
      this.filterMessages(selectedUser.id);
    }
  }
  filterMessages(selectedUserId: number): void {
    this.userMessages = this.userMessages.filter(
      (message) =>
        (message.userFromId === this.user &&
          message.userToId === selectedUserId) ||
        (message.userFromId === selectedUserId &&
          message.userToId === this.user)
    );
  }
}

// Models
export class Chat {
  id: number;
  user1: User;
  user2: User;
  messageList: Message[];
}

export class Message {
  id: number;
  chat: Chat;
  senderUsername: string;
  time: Date;
  replyMessage: string;
}

export class User {
  id: number;
  username: string;
  email: string;
}
