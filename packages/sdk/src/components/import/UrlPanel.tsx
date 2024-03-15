import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import type { SUPPORTEDTYPE, FieldType } from '@teable/core';
import { importTypeMap } from '@teable/core';
import { Input, Button, Spin } from '@teable/ui-lib';
import type { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useTranslation } from '../../context/app/i18n';

interface IUrlPanel {
  fileType: SUPPORTEDTYPE;
  analyzeFn: UseMutateAsyncFunction<
    AxiosResponse<
      {
        worksheets: Record<
          string,
          {
            name: string;
            columns: {
              name: string;
              type: FieldType;
            }[];
          }
        >;
      },
      unknown
    >,
    unknown,
    {
      fileType: SUPPORTEDTYPE;
      attachmentUrl: string;
    },
    unknown
  >;
  isFinished: boolean;
}

const UrlPanel = (props: IUrlPanel) => {
  const { fileType, analyzeFn, isFinished } = props;
  const [linkUrl, setLinkUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  return (
    <div className="flex h-32 w-full flex-col items-start px-2">
      <h4 className="m-2 text-sm">{t('import.title.linkUrlInputTitle')}</h4>
      <div className="flex w-full">
        <Input
          type="url"
          placeholder={importTypeMap[fileType].exampleUrl}
          className="mr-2 w-full"
          value={linkUrl}
          onChange={(e) => {
            const { value } = e.target;
            setLinkUrl(value);
          }}
        />
        <Button
          variant="outline"
          disabled={isFinished || !linkUrl}
          onClick={() => {
            const urlReg =
              /^(?:https?|ftp):\/\/[-a-z\d]+(?:\.[-a-z\d]+)*\.(?:com|cn|edu|uk)\/[-\w:@&?=+,.!~*'%$/]*$/;
            if (!linkUrl) {
              setErrorMessage(t('import.form.error.urlEmptyTip'));
              return;
            }
            if (urlReg.test(linkUrl)) {
              setErrorMessage(t('import.form.error.urlValidateTip'));
              return;
            }
            analyzeFn({
              attachmentUrl: linkUrl,
              fileType,
            });
          }}
        >
          {isFinished && <Spin className="mr-1 size-4" />}
          {t('import.title.upload')}
        </Button>
      </div>
      {errorMessage && <p className="p-2 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export { UrlPanel };
