import { useEffect, useState } from "react"

export type User = {
    id?: string,
    name: string,
    image: string,
    status: string
}

export const useDebounce = (data: string, timeout: number) => {
    const [debouncedValue, setDebouncedValue] = useState<User[]>([]);
    useEffect(() => {
        let timeOutNumber = setTimeout(async() => {
            if(data){
                fetch(`/api/searchuser/${data}`, {
                    method: 'GET',
                }).then((response) => {
                    response.json().then((json) => {setDebouncedValue(json.users)})
                })
            }
        }, timeout);
        return () => {
            clearTimeout(timeOutNumber);
        }
    }, [data, timeout])

    return debouncedValue;

}