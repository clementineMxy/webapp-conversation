import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { 
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon,
  TrashIcon as TrashSolidIcon,
} from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
import type { ConversationItem } from '@/types/app'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export type ISidebarProps = {
  currentId: string
  onCurrentIdChange: (id: string) => void
  onConversationDelete: (id: string) => void
  list: ConversationItem[]
}

const Sidebar: FC<ISidebarProps> = ({
  currentId,
  onCurrentIdChange,
  onConversationDelete,
  list,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px]  border-r border-gray-200 tablet:h-[calc(100vh_-_3rem)] mobile:h-screen"
    >
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0">
          <Button
            onClick={() => { onCurrentIdChange('-1') }}
            className="group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm">
            <PencilSquareIcon className="mr-2 h-4 w-4" /> {t('app.chat.newChat')}
          </Button>
        </div>
      )}

      <nav className="mt-4 flex-1 space-y-1 bg-white p-4 !pt-0">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          const ItemIcon
            = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
          const DeleteIcon = isCurrent ? TrashSolidIcon : TrashIcon
          return (
            <div
              onClick={() => onCurrentIdChange(item.id)}
              key={item.id}
              className={classNames(
                isCurrent
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
              )}
            >
              { isCurrent ? 
                  <ItemIcon
                    className={classNames(
                      'text-primary-600 mr-3 h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  /> :
                  <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation()
                      onConversationDelete(item.id)
                    }}
                    className={classNames(
                      'text-gray-400 hover:text-red-500 mr-3 h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
              }
              {item.name}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default React.memo(Sidebar)
