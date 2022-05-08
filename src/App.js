import logo from './logo.svg';
import './App.css';
import useJsonFetch from "./UseFetch";
import {useEffect, useState} from "react";

function App() {
    return (
        <>
            <Data/>
            <Error/>
            <Loading/>
        </>
    );
}

export default App;


function Data() {
    const [fetchData] = useJsonFetch('data')
    const [data, setData] = useState(undefined)

    useEffect(() => {
        if (fetchData === undefined) {
            return
        }
        setData(fetchData)
    }, [fetchData])

    return {data} && <div>{JSON.stringify(data)}</div>
}

function Error() {
    const [fetchData, isLoading, error] = useJsonFetch('error')
    const [err, setErr] = useState(undefined)

    useEffect(() => {
        if (error === undefined) {
            return
        }
        setErr(error)
    }, [error])

    return {err} && <div>{JSON.stringify(err)}</div>
}

function Loading() {
    const [_, isLoading, hasError] = useJsonFetch('loading')
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(isLoading)
    }, [isLoading])

    return <div>{load ? 'Загрузка...' : "Загружено"}</div>
}