import {Suspense} from "react";
import Loading from "@/components/Loading";
export default function Home() {
    return (
        <Suspense>
            <Loading/>
        </Suspense>
    )
}
