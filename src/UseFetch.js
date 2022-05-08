import {useState, useEffect, useRef} from "react"

const url = 'http://localhost:7070/'

export default function useJsonFetch(handler) {
    const [data, setData] = useState(undefined);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);
    const status = useRef(0)

    useEffect(() => {
        setLoading(true)
        fetch(url + handler)
            .then(response => {
                status.current = response.status
                return response.json()
            })
            .then(data => {
                if (status.current >= 200 && status.current < 300) {
                    setData(data)
                } else {
                    setError(data)
                }
                setLoading(false)
            }).catch(
            reject => {
                setError(reject)
                setLoading(false)
            }
        )
    }, []);


    return [data, isLoading, hasError];
}