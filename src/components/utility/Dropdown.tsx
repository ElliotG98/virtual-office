import {
    Dropdown as NextuiDropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Badge,
} from '@nextui-org/react';

interface Item {
    key: string;
    label: string;
    badge?: number;
    action: () => void;
}

interface DropdownProps {
    items: Item[];
    dialogue: string;
    color?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger'
        | undefined;
}

const Dropdown = ({ items, dialogue, color = 'default' }: DropdownProps) => {
    const handleDropdownItemClick = (key: string) => {
        const item = items.find((i) => i.key === key);
        item?.action();
    };

    const badges = items.reduce((acc, curr) => {
        acc += curr?.badge || 0;
        return acc;
    }, 0);

    return (
        <NextuiDropdown>
            <Badge
                color="danger"
                content={badges}
                isInvisible={badges ? false : true}
                shape="circle"
            >
                <DropdownTrigger>
                    <Button variant="bordered" color={color}>
                        {dialogue}
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item: any) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === 'delete' ? 'danger' : 'default'}
                        className={item.key === 'delete' ? 'text-danger' : ''}
                        onClick={() => handleDropdownItemClick(item.key!)}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </NextuiDropdown>
    );
};

export default Dropdown;
