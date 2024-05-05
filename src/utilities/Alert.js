import { useToast } from 'vue-toastification'

export default class Alert {
    static configurations = {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: "fas fa-rocket",
        rtl: false,
    }

    static success(message) {
        const toast = useToast()

        toast.success(message, this.configurations)
    }

    static error(message) {
        const toast = useToast()

        toast.error(message, this.configurations)
    }
}
