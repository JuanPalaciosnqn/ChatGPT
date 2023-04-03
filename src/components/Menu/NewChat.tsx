import React from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import PlusIcon from '@icon/PlusIcon';

import useAddChat from '@hooks/useAddChat';

const NewChat = ({
  folder,
  compact,
}: {
  folder?: string;
  compact?: boolean;
}) => {
  const { t } = useTranslation();
  const addChat = useAddChat();
  const generating = useStore((state) => state.generating);

  return (
    <a
      className={`flex items-center max-md:hidden rounded-md hover:bg-gray-500/10 transition-all duration-200 text-white text-sm flex-shrink-0 ${
        generating
          ? 'cursor-not-allowed opacity-40'
          : 'cursor-pointer opacity-100'
      } ${
        compact
          ? 'justify-start'
          : 'py-3 px-3 gap-3 md:mb-2 md:border md:border-white/20'
      }`}
      onClick={() => {
        if (!generating) addChat(folder);
      }}
      title={compact ? String(t('newChat')) : ''}
    >
      {compact ? (
        <div className='max-h-0 group-hover/folder:max-h-10 group-hover/folder:py-3 px-3 overflow-hidden transition-all duration-200 delay-700 text-sm flex gap-3 items-center text-gray-100'>
          <PlusIcon /> {t('newChat')}
        </div>
      ) : (
        <>
          <PlusIcon />{' '}
          <span className='hidden md:inline-flex text-white text-sm'>
            {t('newChat')}
          </span>
        </>
      )}
    </a>
  );
};

export default NewChat;
