import Draw from './components/Draw';

export default {
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '/',
            component: Draw
        },
    ]
};