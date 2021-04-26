import Vue, { VueConstructor } from 'vue'
import 'muse-ui/lib/styles/base.less';
import {
    Button,
    List,
    SubHeader,
    Menu,
    Icon,
    BottomSheet,
    Divider,
    Avatar,
    Snackbar,
    Drawer,
    GridList,
    Grid,
    Chip,
    Dialog,
    Form,
    TextField,
    LoadMore
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import Toast, { ToastOptions } from 'muse-ui-toast';
const MuseUIToast: Toast = require('muse-ui-toast').default;

const toastOptions: ToastOptions = {
    position: 'top',
    time: 1000,
}

Vue.use(MuseUIToast, toastOptions)

const plugin = [
    Button,
    List,
    SubHeader,
    Menu,
    Icon,
    BottomSheet,
    Divider,
    Avatar,
    Snackbar,
    Drawer,
    GridList,
    Grid,
    Chip,
    Dialog,
    Form,
    TextField,
    LoadMore
]

export default {
    install(Vue: VueConstructor<Vue>) {
        plugin.forEach(item => {
            Vue.use(item)
        })
    }
}