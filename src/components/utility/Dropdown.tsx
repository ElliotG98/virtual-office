import {
    Dropdown as NextuiDropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';

interface Item {
    key: string;
    label: string;
    action: () => void;
}

interface DropdownProps {
    items: Item[];
    dialogue: string;
}

const Dropdown = ({ items, dialogue }: DropdownProps) => {
    const handleDropdownItemClick = (key: string) => {
        const item = items.find((i) => i.key === key);
        item?.action();
    };

    return (
        <NextuiDropdown>
            <DropdownTrigger>
                <Button variant="bordered">{dialogue}</Button>
            </DropdownTrigger>
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
