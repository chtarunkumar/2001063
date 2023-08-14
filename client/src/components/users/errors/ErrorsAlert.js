import React from 'react';
import { useSnackbar } from 'notistack';

export default function MyApp({ errors }) {
    const { enqueueSnackbar } = useSnackbar();



    const renderErrors = () => {
        return (
            errors.map(error => enqueueSnackbar(error, { variant: "error" }))
        )
    }

    return (

        renderErrors()

    );
}
