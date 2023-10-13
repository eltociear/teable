import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@teable-group/ui-lib';

interface IAddActionDropMenuProps {
  children: React.ReactElement;
}

const AddActionDropMenu = (props: IAddActionDropMenuProps) => {
  const { children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>Advanced Logic</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Conditional logic
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Repeating group
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Teable</DropdownMenuItem>
          <DropdownMenuItem>Send email</DropdownMenuItem>
          <DropdownMenuItem>Create record</DropdownMenuItem>
          <DropdownMenuItem>Update record</DropdownMenuItem>
          {/* <DropdownMenuItem>Find record</DropdownMenuItem>
          <DropdownMenuItem disabled>Run script</DropdownMenuItem> */}
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Integrations</DropdownMenuItem>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AddActionDropMenu };
