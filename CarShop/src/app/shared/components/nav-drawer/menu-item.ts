export class MenuItem {
    parent: MenuItem | null = null;
    
    selected: boolean = false;

    id!: number;

    icon!: string;
    label!: string;
    url!: string | undefined;

    children: MenuItem[] = new Array<MenuItem>();


    public getRootNode(): MenuItem {
        return (this.parent)
            ? this.parent.getRootNode()
            : this;
    }
}