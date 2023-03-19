import { useRouter } from "next/router";

export default function ClientProject() {

    const router = useRouter()

    const query = router.query

    function loadProjectHandler() {
        // load data...

        // * Single Line
        // router.push(`/clients/${query.id}/project-a`) // -> user can use back button to go to previous page
        // router.replace(`/clients/${query.id}/project-a`) // -> does not record history and cannot go back after navigation

        // * As Object
        router.push({
            pathname: '/clients/[id]/[selected]',
            query: {
                id: query.id,
                selected: 'project-A'
            }           
        })
    }

    return (
        <div>
            <h1>The Projects of a Given Client</h1>
            <button onClick={loadProjectHandler}>Load {query.id.toUpperCase()} Project A</button>
        </div>
    )
}