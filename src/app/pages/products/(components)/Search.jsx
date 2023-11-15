"use client";
import React, {useEffect} from 'react';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {Container, TextField} from "@mui/material";

const Search = () => {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("q");
        replace(`${pathname}?${params}`);
    }, []);

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", 1);

        if (e.target.value) {
            e.target.value.length > 2 && params.set("q", e.target.value);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params}`);
    }, 300);// 300 ms delay

    return (
        <div>
            <div className={"w-[300px] p-3 pl-4"}>
                <TextField
                    fullWidth
                    // variant="filled"
                    size="small"
                    id="search"
                    label="Search"
                    type="search"
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}
export default Search;
