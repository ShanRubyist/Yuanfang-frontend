export default function useNotify() {
    const toast = useToast()

    const notify = (type, title: string, timeout=3000) => {
        toast.add({
            title: title,
            timeout: 3000,
            icon: 'i-heroicons-exclamation-circle',
            color: type == 'success' ? 'green' : 'red'
          })
    }
  
    return {
      notify
    }
  }