import { useRouter } from "next/router";

export default function ClientSelected() {

    const router = useRouter()

    const query = router.query

    return (
        <div>
            <h1>Selected Client - {query.id}</h1>
            <p>Selected: {query.selected}</p>
        </div>
    )
}