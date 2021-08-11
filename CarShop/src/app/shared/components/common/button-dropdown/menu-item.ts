export class MenuItem {
    label!: string;
    icon!: string;
    command?: (event?: Event) => void;
    active: boolean = false;

    constructor(label: string, icon: string, command: ((event?: Event | undefined) => void) | undefined) {
        this.label = label;
        this.icon = icon;
        this.command = command;
    }
}