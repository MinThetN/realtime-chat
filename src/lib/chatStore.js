import { create } from 'zustand'
import { useUserStore } from './userStore'

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: null,
  isReceiverBlocked: null,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser

    // Check if current user is blocked or not
    if ( (user.blocked || []).includes(currentUser.id)) {
        return set({
            chatId,
            user: null,
            isCurrentUserBlocked: true,
            isReceiverBlocked: false,
        })
    }

    // Check if receiver is blocked or not
    else if ( (currentUser.blocked || []).includes(user.id)) {
        return set({
            chatId,
            user: null,
            isCurrentUserBlocked: false,
            isReceiverBlocked: true,
        })
    } else {
        // If none of the above, then set the chat
        return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        });
    }

    
  },

  changeBlock: () => {
    set(state => ({...state, isReceiverBlocked: !state.isReceiverBlocked}))
  }

}));

