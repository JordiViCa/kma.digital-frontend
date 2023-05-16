import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent  implements OnInit {

  contactf: any[] = [];
  con: any;
  filter: string = "dated";

  constructor(
    private contactSVC: ContactService
  ) { }

  ngOnInit() {
    this.getContacts()
  }

  getContacts() {
    this.contactSVC.getContact().subscribe(
      (el: any) => {
        if (!el) {
          return
        }
        this.contactf = el.data;
        console.log(el)
      }
    )
  }

  closePopup(event: any) {
    if (event.target.id == "closePopup") {
      this.con = undefined;
    }
  }

  selectContact(contact: any) {
    if (!contact.seen) {
      this.contactSVC.markAsSeen(contact._id).subscribe(
        (el: any) => {
          if (!el) {
            return;
          }
          this.getContacts()
        }
      )
    }
    this.con = contact;
  }

  setFilter(filter: string) {
    if (this.filter == filter) {
      this.filter = filter + "d";
    } else {
      this.filter = filter;
    }
  }
}
