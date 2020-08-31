import { makeStyles } from '@material-ui/core';

const navbarStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '5px 10px',
        backgroundColor: '#333',
        height: 'auto',
        minHeight: 'auto',
        justifyContent: 'initial',
        zIndex: 1500
    },
    img: {
        height: 'auto',
        width: '55px',
        float: 'left',
        display: 'block',
        marginRight: '1em',

    },
    navLink: {
        backgroundColor: 'transparent',
        color: '#f2f2f2',
        textAlign: 'center',
        textDecoration: 'none',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '0.5em',
        textTransform: 'initial'
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    }
}));

export default navbarStyles;
