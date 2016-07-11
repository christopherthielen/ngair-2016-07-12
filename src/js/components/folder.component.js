import {app} from "../ngmodule";

class FolderController {
  constructor(Messages) {
    this.senderName = Messages.senderName;
    this.headshotUrl = Messages.headshotUrl;
  }
}

app.component('folder', {
  controller: FolderController,
  bindings: { folder: '<', messages: '<' },
  template: `
    <div id="list" class="pure-u-1">
    
        <div ng-repeat="message in $ctrl.messages"
             class="email-item pure-g" ng-class="{ 'email-item-unread': !message.read }"
             ui-sref-active="email-item-selected" ui-sref=".message({ messageId: message._id })">
    
            <div class="pure-u">
                <img class="email-avatar" alt="{{ ::$ctrl.senderName(message) }}&#x27;s avatar" height="64" width="64" ng-src="{{ ::$ctrl.headshotUrl(message) }}">
            </div>
    
            <div class="pure-u-3-4">
                <h5 class="email-name">{{ ::$ctrl.senderName(message) }}</h5>
                <h4 class="email-subject">{{ message.subject }}</h4>
                <p class="email-desc">
                    {{ message.body | limitTo: 75 }}
                </p>
            </div>
        </div>
    
    </div>
`
});