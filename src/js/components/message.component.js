import {app} from "../ngmodule";

class MessageController {
  constructor($state, Messages) {
    this.$state = $state;
    this.Messages = Messages;
  }

  $onInit() {
    var folder = this.folder;
    var Messages = this.Messages;
    var message = this.message;

    this.folders = this.folders.map(function(_folder) { return _folder._id; })
      .filter(function(_folder) { return _folder !== folder._id});
    this.senderName = Messages.senderName(message);
    this.headshotUrl = Messages.headshotUrl(message);

    message.read = true;
    Messages.save(message);
  }

  delete(message) {
    var $state = this.$state;
    this.Messages.remove(message).then(function() {
      return $state.go("^", null, { reload: 'app.folder' });
    });
  }

  toggleUnread(message) {
    message.read = !message.read;
    this.Messages.save(message);
  }

  moveTo(message, folder) {
    var $state = this.$state;
    message.folder = folder;
    this.Messages.save(message).then(function() {
      return $state.go("^", null, { reload: 'app.folder' });
    });
  }
}

app.component('message', {
  controller: MessageController,
  bindings: { folders: '<', folder: '<', message: '<' },
  template: `
    <div class="email-content">
        <div class="email-content-header pure-g">
            <div class="pure-u-1-5">
                <div class="pure-u">
                    <img alt="{{ $ctrl.senderName }}&#x27;s avatar" style="width: 92px; max-width: 100%;" ng-src="{{ $ctrl.headshotUrl }}">
                </div>
            </div>
    
            <div class="email-content-controls pure-u-4-5">
                <div class="corpus">corpus: {{ $ctrl.message.corpus }}</div><br>
    
                <div class="pure-menu pure-menu-horizontal">
                    <ul class="pure-menu-list">
                        <li class="pure-menu-item pure-button">
                            <a ng-click="$ctrl.delete($ctrl.message)" class="pure-menu-link">Delete</a>
                        </li>
    
                        <li class="pure-menu-item pure-button">
                            <a ng-click="$ctrl.toggleUnread($ctrl.message)" class="pure-menu-link">
                                Mark {{ $ctrl.message.read ? 'Unread' : 'Read' }}
                            </a>
                        </li>
    
                        <li class="pure-menu-item pure-button pure-menu-has-children pure-menu-allow-hover">
                            <a id="menuLink1" class="pure-menu-link">Move to</a>
                            <ul class="pure-menu-children">
                                <li ng-repeat="folder in $ctrl.folders" class="pure-menu-item">
                                    <a ng-click="$ctrl.moveTo($ctrl.message, folder)" class="pure-menu-link">{{ folder }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="pure-u">
                <p class="email-content-subtitle">
                    From <a>{{ $ctrl.senderName }}</a> at <span>{{ $ctrl.message.date | date: 'short' }}</span>
                </p>
                <h3 class="email-content-title">{{ $ctrl.message.subject }}</h3>
            </div>
        </div>
    
        <div class="email-content-body" ng-bind-html="$ctrl.message.body | messageBody"></div>
    </div>
`
});