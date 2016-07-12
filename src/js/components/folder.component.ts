import {Input, Component, Inject} from "@angular/core";
import {UIROUTER_DIRECTIVES} from "ui-router-ng2/ng2";
import {Messages} from "../services/datasources";

let template = `
    <div id="list" class="pure-u-1">
    
        <div *ngFor="let message of messages"
             class="email-item pure-g" [class.email-item-unread]="!message.read"
             uiSrefActive="email-item-selected" uiSref=".message" [uiParams]="{ messageId: message._id }">
    
            <div class="pure-u">
                <img class="email-avatar" alt="{{ senderName(message) }}&#x27;s avatar" height="64" width="64" [src]="headshotUrl(message)">
            </div>
    
            <div class="pure-u-3-4">
                <h5 class="email-name">{{ senderName(message) }}</h5>
                <h4 class="email-subject">{{ message.subject }}</h4>
                <p class="email-desc">
                    {{ message.body | slice:0:75 }}
                </p>
            </div>
        </div>
    
    </div>
`;

@Component({
  template: template,
  directives: [UIROUTER_DIRECTIVES]
})
export class Folder {
  @Input() private folder;
  @Input() private messages;
  private senderName;
  private headshotUrl;

  constructor(messages: Messages) {
    this.senderName = messages.senderName;
    this.headshotUrl = messages.headshotUrl;
  }
}