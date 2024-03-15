import { IMPORT_SUPPORTED_TYPES } from '@teable/core';
import type { FieldType, IImportColumn } from '@teable/core';
import { Trash, Lock } from '@teable/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
} from '@teable/ui-lib';
import { useMemo } from 'react';
import { useTranslation } from '../../../context/app/i18n';
import { useFieldStaticGetter } from '../../../hooks';
import { BaseSingleSelect } from '../../filter/component/base/BaseSingleSelect';

interface IPreviewColumnProps {
  columns: IImportColumn[];
  onChange: (columns: IImportColumn[]) => void;
}

export const PreviewColumn = (props: IPreviewColumnProps) => {
  const { columns, onChange } = props;
  const getFieldStatic = useFieldStaticGetter();
  const { t } = useTranslation();
  const candidates = useMemo(
    () =>
      IMPORT_SUPPORTED_TYPES.map<{ value: FieldType; label: string; icon: JSX.Element }>((type) => {
        const { title, Icon } = getFieldStatic(type, false);
        return {
          value: type,
          label: title,
          icon: <Icon />,
        };
      }),
    [getFieldStatic]
  );

  const onChangeHandler = (data: IImportColumn[]) => {
    onChange(data);
  };

  return (
    <Table className="scroll-smooth">
      <TableHeader>
        <TableRow>
          <TableHead className="w-56">{t('field.fieldName')}</TableHead>
          <TableHead>{t('field.fieldType')}</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns.map((column, index) => (
          <TableRow key={index}>
            <TableCell className="relative font-medium">
              <Input
                placeholder="fieldName"
                className="h-8"
                value={column.name}
                onChange={(e) => {
                  const newColumns = [...columns];
                  newColumns[index].name = e.target.value;
                  onChangeHandler(newColumns);
                }}
              />
            </TableCell>
            <TableCell>
              <BaseSingleSelect
                className="w-full"
                options={candidates}
                value={column.type}
                onSelect={(value) => {
                  const newColumns = [...columns];
                  newColumns[index].type = value as FieldType;
                  onChangeHandler(newColumns);
                }}
              ></BaseSingleSelect>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="xs"
                disabled={index === 0}
                onClick={() => {
                  const newColumns = [...columns];
                  newColumns.splice(index, 1);
                  onChange(newColumns);
                }}
              >
                {index === 0 ? <Lock className="size-4" /> : <Trash className="size-4" />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
