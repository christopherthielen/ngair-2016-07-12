import { Pipe, PipeTransform } from '@angular/core';

/** Angular2 pipe to format fake emails as HTML*/
@Pipe({name: 'messageBody'})
export class MessageBodyPipe implements PipeTransform {
  transform(msgText: string): string {
    return msgText.split(/\n/).map(p => `<p>${p}</p>`).join('\n');
  }
}
