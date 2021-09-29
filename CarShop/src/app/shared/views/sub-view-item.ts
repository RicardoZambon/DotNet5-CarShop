import { IBaseChildView } from '../interfaces/i-base-child-view';
import { MenuItem } from '../components/common/button-dropdown/menu-item';

export class SubViewItem extends MenuItem {

    view!: IBaseChildView;

    constructor(id: string, label: string, icon: string, command?: ((event?: Event | undefined) => void)) {
        super(id, label, icon, command, false);
    }
}