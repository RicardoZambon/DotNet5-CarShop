import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageFormat'
})
export class MessageFormatPipe implements PipeTransform {

    transform(message: string, count: number, name: string): string {
        return message
            .replace('[SelectionCount]', count.toString())
            .replace('[SelectionName]', name);
    }
}