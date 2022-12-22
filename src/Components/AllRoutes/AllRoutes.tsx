import React from 'react';
import {useRoutes} from "react-router-dom"
import SingleBook from '../Books/SingleBooks';
import HomeScreen from '../HomeScreen';
import UploadPage from '../UploadPage/UploadPage';

const AllRoutes = () => {

    let element = useRoutes([
        {
            path: "/",
            element: <HomeScreen />
        },
        {
            path: "/books/:id/details",
            element: <SingleBook />
        },
        {
            path: "/uploads",
            element: <UploadPage />
        }
    ])



  return element
}

export default AllRoutes