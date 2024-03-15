import { RowHeightLevel, SUPPORTEDTYPE } from '@teable/core';
import { DivideSquare, Menu, Square, StretchHorizontal } from '@teable/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@teable/ui-lib';
import React from 'react';
import { useTranslation } from '../../context/app/i18n';

export const Import = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-48 p-0">
        <DropdownMenuLabel className="px-4 text-xs font-normal text-muted-foreground">
          insert data from upload
        </DropdownMenuLabel>
        <DropdownMenuItem>Insert Data from csv</DropdownMenuItem>
        <DropdownMenuItem>Insert Data from excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
