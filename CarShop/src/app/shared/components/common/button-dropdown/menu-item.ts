export class MenuItem {
    id!: string;
    label!: string;
    icon!: string;
    command?: (event?: Event) => void;
    
    active: boolean = false;
    visible: boolean = true;

    constructor(id: string, label: string, icon: string, command: ((event?: Event | undefined) => void) | undefined, active?: boolean) {
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.command = command;

        if (active !== undefined) {
            this.active = active;
        }
    }
}