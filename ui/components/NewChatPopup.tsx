import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EmptyChatMessageInput from '@/components/EmptyChatMessageInput';

export const NewChatPopup = ({
  sendMessage,
  focusMode,
  setFocusMode,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeModal = () => {
    setIsDialogOpen(false);
    document.body.classList.remove('overflow-hidden-scrollable');
  };

  const openModal = () => {
    setIsDialogOpen(true);
    document.body.classList.add('overflow-hidden-scrollable');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        openModal();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30 bg-backdrop/70 backdrop-blur-sm animate-in fade-in fill-mode-both" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-200"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-md transform rounded-2xl bg-light-primary dark:bg-dark-primary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto p-2 pt-6 space-y-8">
                  <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
                    Research begins here.
                  </h2>
                  <EmptyChatMessageInput
                    sendMessage={sendMessage}
                    focusMode={focusMode}
                    setFocusMode={setFocusMode}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
