import {AxiosResponse} from 'axios';
import {defineStore} from "pinia";
import {buildRequest, send} from "@/src/helpers/xhr";
import {useAuthStore} from "@/src/stores/auth";

interface Meta {
    title: string,
    version: string,
    adminCreated: boolean,
    is_token_valid: string,
}

interface State {
    pageTitle: string,
    meta: Meta,
    editingUnsavedChanges: boolean,
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        pageTitle: 'Wiki',
        meta: {
            title: 'Loading...',
            version: '0',
            adminCreated: false,
            is_token_valid: 'token_not_set',
        },
        editingUnsavedChanges: false,
    }),
    getters: {
        getPageTitle: (state) => state.pageTitle,
        getMeta: state => state.meta,
    },
    actions: {
        init(token: string | null) {
            const request = buildRequest('/api/init', {token: token}, 'POST');
            return send(request).then((response: AxiosResponse) => {
                if (response.data.is_token_valid !== 'token_valid') {
                    useAuthStore().logout();
                }
                this.$state.meta = response.data;

                return response;
            });
        },
        setHasUnsavedChanges(hasUnsavedChanges: boolean) {
            this.editingUnsavedChanges = hasUnsavedChanges;
        },
        setTitle(title: string) {
            if (title === 'Wiki') {
                document.title = 'Wiki';
            } else {
                document.title = title + ' · Wiki';
            }
            this.$state.pageTitle = title;
        },
    },
})