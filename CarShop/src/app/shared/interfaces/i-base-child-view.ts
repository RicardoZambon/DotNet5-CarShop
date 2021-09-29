import { IBaseView } from './i-base-view';

export interface IBaseChildView extends IBaseView {
    visible: boolean;

    onViewVisible(): void;
}