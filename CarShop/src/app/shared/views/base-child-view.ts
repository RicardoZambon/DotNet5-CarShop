import { BaseView } from 'src/app/shared/views/base-view';
import { IBaseChildView } from '../interfaces/i-base-child-view';

export abstract class BaseChildView extends BaseView implements IBaseChildView {

    visible: boolean = false;
    
    onViewVisible(): void {
    }
}